import { bleManager } from '../../../App';
// import { BleDevice } from '../useBleConnection/useBleConnection';

// TODO: change for dynamic use
// Need to add fn to change device's name
const FIXED_NAME = 'BLUNO';

//
// Wrapper for bleManager
//
export default class BleScanning {
  startScanning(onNewDevice) {
    bleManager.startDeviceScan(["00000000-0000-1000-8000-00805F9B34FB"], null, (error, device) => {

      console.log("test", device)
      if (!device) return;
      if (
        device.name.toUpperCase().includes(FIXED_NAME) ||
        device.localName.toUpperCase().includes(FIXED_NAME)
      ) {
        onNewDevice({
          name: device.name ? device.name : '',
          id: device.id ? device.id : ''
        });

        console.log('new DEVICE = ', device);
      }
    });
  }

  stopScanning() {
    bleManager.stopDeviceScan();
  }
}
