import pickle

def read_dat_file(file_path):
    # Depending on the .dat file format, you might need to change how the file is read
    with open(file_path, 'rb') as file:  # 'rb' for reading binary file
        data = pickle.load(file)
        # Process the data as required
    return data

# Replace with your .dat file path
file_path = '31_01_2024_12_39_04_csi.dat'

# Read the data

csi_data = read_dat_file(file_path)
print(csi_data)
