import os
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.utils import shuffle
import torch
from torch.utils.data import DataLoader, TensorDataset

from CSIDataset import process_csi
from SimpleCNN import SimpleCNN

file = "31_01_2024_12_52_44_csi.cmplx"

# Function to read data from file
def read_file(filename):
    with open(filename, 'rb') as FID:
        mp = pickle.Unpickler(FID)
        data = mp.load()
    return data

data = read_file(os.path.join("ML_Model", "ExperimentData", file))
CSIs = []
grouped_packets = []

for entry in data:
    processed_packet = process_csi(entry['complex_csi'])
    for packet in processed_packet:
        grouped_packets.append(packet)
        if len(grouped_packets) == 30:  # Grouping 30 packets
            CSIs.append(np.vstack(grouped_packets))
            grouped_packets = []  # Reset for next group


# Assuming new_data_sample is your new 720 packet-long complex data

# Convert to PyTorch tensor and add a batch dimension
processedCSIs = []
for csi in CSIs:
    processedCSIs.append(torch.tensor(csi, dtype=torch.float32).unsqueeze(0))
#processed_sample_tensor = torch.tensor(CSIs, dtype=torch.float32).unsqueeze(0)  # Adds batch dimension

# Load your trained model (if not already in memory)
model = SimpleCNN()
model.load_state_dict(torch.load('ML_Model/model.pth'))
model.eval()

timestamp = 0
# Make a prediction
for processedCSI in processedCSIs:  
    with torch.no_grad():
        prediction = model(processedCSI)

    # Interpret the prediction
    # For example, if it's a classification problem:
    predicted_class = torch.argmax(prediction, dim=1)
    print(f"Predicted class: {predicted_class.item()}\t for time: {timestamp}-{timestamp+1}")
    timestamp += 1
