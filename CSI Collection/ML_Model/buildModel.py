import numpy as np
from sklearn.model_selection import train_test_split
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader

from SimpleCNN import SimpleCNN
from CSIDataset import get_CSIs, toDataset
from TrainCNN import train, evaluate

def main():
    CSIs, Labels = get_CSIs("ML_Model/TrainingData")

    train_dataset, test_dataset = toDataset(CSIs, Labels)

    train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
    test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)
    # Initialize model, loss function, and optimizer
    model = SimpleCNN()
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Define the number of epochs
    num_epochs = 20

    # Training loop
    for epoch in range(num_epochs):
        train_loss = train(model, train_loader, optimizer, criterion)
        test_loss, test_accuracy = evaluate(model, test_loader, criterion)
        print(f"Epoch {epoch+1}/{num_epochs}, Train Loss: {train_loss:.4f}, Test Loss: {test_loss:.4f}, Test Accuracy: {test_accuracy:.4f}")

    
    torch.save(model.state_dict(), 'ML_Model/model.pth')
    print("Saved trained model to 'model.pth'")

if __name__ == "__main__":
    main()
