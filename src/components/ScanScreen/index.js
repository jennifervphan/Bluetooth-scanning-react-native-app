import React, { useEffect, useCallback } from 'react';
import useBleScanning from '../../ble/useBleScanning/useBleScanning';
import useBleConnection from '../../ble/useBleConnection/useBleConnection';
import ScanDevicesScreen from './Screen';
//

const ScanDevicesScreenContainer = ({ onDeviceConnected, onClose }) => {
  console.log("here")
  const { devices } = useBleScanning();

  const {
    isConnected,
    isConnecting,
    connectToDevice,
    stopConnecting,
    currentDevice
  } = useBleConnection();

  // we have connected to a new device
  useEffect(() => {
    if (isConnected && currentDevice !== null) {
      onDeviceConnected(currentDevice);
    }
  }, [isConnected, currentDevice, onDeviceConnected]);

  // stop connecting on unmount
  useEffect(() => {
    return () => stopConnecting();
  }, [stopConnecting]);

  //

  function onDevicePress(device) {
    if (!isConnecting) {
      console.log('connectToDevice');
      connectToDevice(device);
    }
  }

  return (
    <ScanDevicesScreen
      devices={devices}
      onClose={onClose}
      onDevicePress={onDevicePress}
      isConnecting={isConnecting}
      currentDevice={currentDevice}
    />
  );
};

//

export default ScanDevicesScreenContainer;
