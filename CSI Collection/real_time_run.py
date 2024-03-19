import threading
import socket
import time
import torch
from ML_Model.CSIDataset import process_csi
from ML_Model.SimpleCNN import SimpleCNN 
import numpy as np
import ctypes

def binary_to_complex(collector: dict):
    subcarriers_num = (len(collector[list(collector.keys())[0]]) - 18) // 4 # 18 is the number of bytes in leading information & each subcarrier has 4 bytes
    complex_csi = np.zeros((len(collector), subcarriers_num), dtype=complex)
    row = 0
    for packet in collector.items():
        rssi = packet[2:3].hex()
        rssi = ctypes.c_int8(int(rssi, 16)).value
        csi = packet[18:]
        complex_csi[row] = np.array([complex(int.from_bytes(csi[start:start+2], 'little', signed=True), int.from_bytes(csi[start+2:start+4], 'little', signed=True)) for start in range(0, 1024, 4)], dtype=complex)
        row += 1
        
    time_stamp_ns = np.array(list(collector.keys()))
    time_stamp_ns = time_stamp_ns - time_stamp_ns[0]
    
    return complex_csi
    

class DataCollectorModelRunner:
    def __init__(self, collection_interval=10, model_path='ML_Model/model.pth'):
        self.collection_interval = collection_interval
        self.model_path = model_path
        self.model = None
        self.collector_thread = None
        self.collected_data = None
        self.collecting = False

    def init_model(self):
        self.model = SimpleCNN()
        self.model.load_state_dict(torch.load(self.model_path))
        self.model.eval()

    def collect_data(self):
        self.client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
        self.client.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        self.client.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        self.client.bind(("", 5500))
        end_time = time.time() + 1  # Collect data for 1 second
        collected_data = []

        while time.time() < end_time:
            data = self.client.recvfrom(4096)
            collected_data.append(data)

        self.collected_data = collected_data
        self.collecting = False

    def start_collecting(self):
        self.collecting = True
        self.collector_thread = threading.Thread(target=self.collect_data)
        self.collector_thread.start()

    def process_and_predict(self, data):
        # Convert to complex
        _, complex_csi, _ = binary_to_complex(data)

        # Process for model input
        processed_data = process_csi(complex_csi)  # Assuming process_csi is the correct method

        # Predict
        processed_data_tensor = torch.tensor(processed_data, dtype=torch.float32).unsqueeze(0)
        with torch.no_grad():
            prediction = self.model(processed_data_tensor)
            predicted_class = torch.argmax(prediction, dim=1)
            return predicted_class.item()

    def run(self):
        while True:
            print("Attempting to collect")
            self.start_collecting()
            self.collector_thread.join()  # Wait for data collection to finish

            if not self.model:
                self.init_model()

            # Get the models prediction of the one second of data
            prediction = self.process_and_predict(self.collected_data)

            if (prediction == 1):
                print("There is movement.")
            else:
                print("There is no movement.")

            # Wait until next time to collect and process.
            time.sleep(self.collection_interval - 1)

collector_and_predictor = DataCollectorModelRunner()
collector_and_predictor.run()