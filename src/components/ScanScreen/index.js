import React, {useEffect, useCallback} from 'react';
import useBleScanning from '../../ble/useBleScanning/useBleScanning';
import useBleConnection from '../../ble/useBleConnection/useBleConnection';
import ScanDevicesScreen from './Screen';
//
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

const ScanDevicesScreenContainer = ({onDeviceConnected, onClose}) => {
  const {devices} = useBleScanning();
  console.log('here', devices);

  const {
    isConnected,
    isConnecting,
    connectToDevice,
    stopConnecting,
    currentDevice,
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
    <>
      <View>
        <Text style={{fontSize: 20}}>All Devices: </Text>
        <Text>-------------------------</Text>
      </View>
      <ScanDevicesScreen
        devices={devices}
        onClose={onClose}
        onDevicePress={onDevicePress}
        isConnecting={isConnecting}
        currentDevice={currentDevice}
      />
    </>
  );
};

//

export default ScanDevicesScreenContainer;
