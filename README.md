# CapstoneGroupThree
## Cloning and Setting Up Nexmon on Raspberry Pi for CSI Data Collection

To collect CSI (Channel State Information) data using Nexmon on a Raspberry Pi, follow these steps:

### 1. Clone Nexmon Repository on Raspberry Pi

Clone the Nexmon repository into your Raspberry Pi by executing the following commands:

```bash
git clone https://github.com/seemoo-lab/nexmon.git
cd nexmon
```

### 2. Connect Raspberry Pi to Router via SSH

Connect your Raspberry Pi to the router using SSH. Replace `<raspberryIp>` with the actual IP address of your Raspberry Pi:

```bash
ssh pi@<raspberryIp>
```

### 3. Transfer and Run Setup Script

Transfer the `setup.sh` script to the Raspberry Pi using SCP or another method. Once transferred, execute the script with the following command:

```bash
sudo bash setup.sh --laptop-ip <ip> --raspberry-ip <ip> --mac-adr <MAC> --channel <channel> --bandwidth <bandwidth> --core <core> --spatial-stream <spatial stream>
```

#### Note:
- **--laptop-ip:** The IP address of the laptop that will collect data. Ensure this laptop is connected to the same router as the Raspberry Pi. You can also collect CSI data directly on the Raspberry Pi.
  
- **--raspberry-ip:** The IP address of the Raspberry Pi.

- **--mac-adr:** MAC address of the transmitter to filter.

- **--channel, --bandwidth, --core, --spatial-stream:** CSI collection specifications (refer to Nexmon CSI project documentation for details).
- The bandwith: 40 

### 3.5:
- Make sure to run ```pip3 install -r requirements.txt``` to install all required python3 libraries.

### 4. Optional: Collecting CSI on Raspberry Pi

If you prefer to collect CSI data directly on the Raspberry Pi without rerouting packets to another laptop, omit the `--laptop-ip` parameter in the setup script.

Ensure to refer to the Nexmon CSI project documentation for more details on CSI collection specifications.
