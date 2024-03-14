import os
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.utils import shuffle
import torch
from torch.utils.data import DataLoader, TensorDataset


# Function to read data from file
def read_file(filename):
    with open(filename, 'rb') as FID:
        mp = pickle.Unpickler(FID)
        data = mp.load()
    return data

# Function to process CSI data
def process_csi(complex_csi):
    ar = np.asmatrix(np.abs(complex_csi))
    arr = np.delete(ar, [0, 1, 2, 3, 4, 115, 116, 117, 118, 119, 120, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 253, 254, 255], 1)
    return arr

# Function to get class labels
def get_classlabel(classname):
    labels = {'NoMovement': 0, 'Movement': 1}
    return labels.get(classname, -1)  # Return -1 for unrecognized labels

# Function to get CSIs from a directory
def get_CSIs(directory):
    CSIs = []
    Labels = []
    grouped_packets = []

    for labels in os.listdir(directory):
        label_path = os.path.join(directory, labels)
        if os.path.isdir(label_path):
            label = get_classlabel(labels)

            for csi_file in os.listdir(label_path):
                if csi_file == '.DS_Store':
                    continue

                data = read_file(os.path.join(label_path, csi_file))

                if data is None:
                    continue

                for entry in data:
                    processed_packet = process_csi(entry['complex_csi'])
                    for packet in processed_packet:
                        grouped_packets.append(packet)
                        if len(grouped_packets) == 30:  # Grouping 30 packets
                            CSIs.append(np.vstack(grouped_packets))
                            Labels.append(label)
                            grouped_packets = []  # Reset for next group

    CSIs, Labels = shuffle(CSIs, Labels, random_state=817328462)
    print(len(CSIs))
    return CSIs, Labels #CSIs list is 48 long, containing a list of 30 packet values each, labels is coreesponding label for packet

def toDataset(CSIs, Labels):
    CSIs = np.array(CSIs)
    Labels = np.array(Labels)

    CSIs = np.expand_dims(CSIs, axis=1)  # Now CSIs shape will be [n_samples, 1, 30, 232]

    # Split the dataset into training and testing sets
    CSI_train, CSI_test, Labels_train, Labels_test = train_test_split(CSIs, Labels, test_size=0.2, random_state=42)

    # Convert numpy arrays to torch Tensors
    CSI_train = torch.Tensor(CSI_train)
    Labels_train = torch.Tensor(Labels_train).long()  # Use long for labels if they are used as indices
    CSI_test = torch.Tensor(CSI_test)
    Labels_test = torch.Tensor(Labels_test).long()

    # Create TensorDatasets
    train_dataset = TensorDataset(CSI_train, Labels_train)
    test_dataset = TensorDataset(CSI_test, Labels_test)
    return train_dataset, test_dataset