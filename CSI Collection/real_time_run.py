import socket
import threading
import time
import torch
import numpy as np
import ctypes
import matplotlib.pyplot as plt
from ML_Model.CSIDataset import process_csi
from ML_Model.SimpleCNN import SimpleCNN
import requests
import asyncio

HOST= '129.10.156.160'

class DataCollectorModelRunner:
    def __init__(self, model_path='ML_Model/model.pth', frequency=60, packet_num=60, collection_interval=1):
        self.model_path = model_path
        self.frequency = frequency
        self.packet_num = packet_num
        self.collection_interval = collection_interval
        self.model = None
        self.collected_data = None
        self.amp_data = []

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
            #print(data, addr)
            collected_data.append((data, addr))

        client.close()
        return collected_data

    def plot_complex_csi(self):
        amp_array = np.array(self.amp_data)

        # Assuming each row in amp_array represents a packet
        if amp_array.shape[1] == 256:  # 80 MHz collection
            amp_array = np.delete(amp_array, [0, 1, 2, 3, 4, 115, 116, 117, 118, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 253, 254, 255], axis=1)
        else:
            print(f"WARNING: pilot and unused subcarrier removal is not implemented for {amp_array.shape[1]} subcarriers.")

        fig, ax = plt.subplots()
        ax.imshow(amp_array.T, interpolation="nearest", aspect="auto")
        ax.set_title("CSI Visualization Over Time")
        ax.set_xlabel("Packet Number")
        ax.set_ylabel("Subcarrier")
        plt.draw()
        plt.pause(0.2)

    def binary_to_complex(self, collected_data):
        complex_cs = []

        for data, _ in collected_data:
            if len(data) < 18:
                continue

            magic_bytes = data[0:2].hex()
            rssi = data[2:3].hex()
            rssi = ctypes.c_int8(int(rssi, 16)).value
            frame_control = data[3:4].hex()
            source_mac = data[4:10].hex()
            sequence_number = data[10:12].hex()
            #print(magic_bytes, frame_control, source_mac, sequence_number)
            csi = data[18:]

            complex_csi = np.array([complex(int.from_bytes(csi[start:start+2], 'little', signed=True),
                                            int.from_bytes(csi[start+2:start+4], 'little', signed=True))
                                    for start in range(0, len(csi), 4)], dtype=complex)
            complex_cs.append(complex_csi)

        return complex_cs

    def process_and_predict(self, data):
        complex_csi = self.binary_to_complex(data)
        processed_data = process_csi(complex_csi)

        for packet_csi in complex_csi:
            amp = abs(packet_csi)  # Convert to amplitude
            self.amp_data.append(amp)  # Append amplitude data of each packet

        #self.plot_complex_csi()  # Update the plot

        processed_data_tensor = torch.tensor(processed_data, dtype=torch.float32).unsqueeze(0)
        with torch.no_grad():
            prediction = self.model(processed_data_tensor)
            predicted_class = torch.argmax(prediction, dim=1)
            return predicted_class.item()

    def run(self):
        if not self.model:
            self.init_model()

        while True:
            collected_data = self.collect_data()
            prediction = self.process_and_predict(collected_data)

            if prediction == 1:
                print("Movement detected.")
            else:
                print("No movement detected.")
            set_csi_frontend(prediction)

            time.sleep(self.collection_interval)

# async def main():
#     await update_frontend()

# async def update_frontend():
#         collector_and_predictor = DataCollectorModelRunner()
#         collector_and_predictor.run()

def set_csi_frontend(movement:bool):
        
        # Constructing the URL for the GET request
        url = f'http://{HOST}:1337/api/csi-datas/1'

        # Sending a GET request to the URL
        mvmt = True if movement else False

        #response = requests.put(url)
        data = {
            'data': {
                #'attributes': {
                    'InRoom': mvmt,
                    'ventLeft': True,
                    "ventAngle": 0
                #}
            }
        }

        response = requests.put(url, json=data)


        # Checking if the request was successful
        if response.status_code == 200:
            print("Temperature set successfully!")
            return True
        else:
            print(f"Failed to set temperature. Status code: {response.status_code}")
            return False


if __name__ == "__main__":
    collector_and_predictor = DataCollectorModelRunner()
    collector_and_predictor.run()
