import socket
import threading
import time
import torch
import numpy as np
import ctypes
from ML_Model.CSIDataset import process_csi
from ML_Model.SimpleCNN import SimpleCNN

class DataCollectorModelRunner:
    def __init__(self, model_path='ML_Model/model.pth', frequency=30, packet_num=30, collection_interval=10):
        self.model_path = model_path
        self.frequency = frequency
        self.packet_num = packet_num
        self.collection_interval = collection_interval
        self.model = None
        self.collected_data = None

    def init_model(self):
        self.model = SimpleCNN()
        self.model.load_state_dict(torch.load(self.model_path))
        self.model.eval()

    def collect_data(self):
        client = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
        client.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        client.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
        client.bind(("", 5500))

        collected_data = []
        for _ in range(self.packet_num):
            data, addr = client.recvfrom(4096)
            collected_data.append((data, addr))

        client.close()
        return collected_data

    def binary_to_complex(self, collected_data):
        complex_cs = []

        for data, _ in collected_data:
            if len(data) < 18:
                continue

            rssi = ctypes.c_int8(int.from_bytes(data[2:3], 'big')).value
            csi = data[18:]

            complex_csi = np.array([complex(int.from_bytes(csi[start:start+2], 'little', signed=True),
                                            int.from_bytes(csi[start+2:start+4], 'little', signed=True))
                                    for start in range(0, len(csi), 4)], dtype=complex)
            complex_cs.append(complex_csi)

        return complex_cs

    def process_and_predict(self, data):
        complex_csi = self.binary_to_complex(data)
        processed_data = process_csi(complex_csi)

        processed_data_tensor = torch.tensor(processed_data, dtype=torch.float32).unsqueeze(0)
        with torch.no_grad():
            prediction = self.model(processed_data_tensor)
            predicted_class = torch.argmax(prediction, dim=1)
            return predicted_class.item()

    def run(self):
        if not self.model:
            self.init_model()

        while True:
            print("Collecting data...")
            collected_data = self.collect_data()
            print("Processing and predicting...")
            prediction = self.process_and_predict(collected_data)

            if prediction == 1:
                print("There is movement.")
            else:
                print("There is no movement.")

            time.sleep(self.collection_interval)

if __name__ == "__main__":
    collector_and_predictor = DataCollectorModelRunner()
    collector_and_predictor.run()
