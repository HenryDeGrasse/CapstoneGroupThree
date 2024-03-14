import torch
import torch.nn as nn
import torch.optim as optim
from SimpleCNN import SimpleCNN

# Function to calculate accuracy
def calculate_accuracy(y_true, y_pred):
    predicted = torch.max(y_pred.data, 1)[1]
    correct = (predicted == y_true).sum().item()
    return correct / len(y_true)

# Training the model
def train(model, train_loader, optimizer, criterion):
    model.train()
    total_loss = 0
    for batch in train_loader:
        data, target = batch
        optimizer.zero_grad()
        output = model(data)
        loss = criterion(output, target)
        loss.backward()
        optimizer.step()
        total_loss += loss.item()
    avg_loss = total_loss / len(train_loader)
    return avg_loss

# Evaluating the model
def evaluate(model, test_loader, criterion):
    model.eval()
    total_loss = 0
    total_accuracy = 0
    with torch.no_grad():
        for batch in test_loader:
            data, target = batch
            output = model(data)
            total_loss += criterion(output, target).item()
            total_accuracy += calculate_accuracy(target, output)
    avg_loss = total_loss / len(test_loader)
    avg_accuracy = total_accuracy / len(test_loader)
    return avg_loss, avg_accuracy
