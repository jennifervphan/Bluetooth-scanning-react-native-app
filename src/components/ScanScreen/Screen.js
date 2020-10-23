import React, { useEffect, useCallback } from 'react';
import { ActivityIndicator, LayoutAnimation } from 'react-native';
import DeviceItem from '../DeviceItem';
import {
  Container,
  ExitButton,
  Scanning,
  ScanningText,
  List
} from './styled';

const LayoutAnimOpacity = {
  duration: 150,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  }
};

//

const ScanDevicesScreen = ({
  devices,
  onClose,
  onDevicePress,
  isConnecting,
  currentDevice
}) => {

    console.log(devices)

  return (
    <Container>
      <ExitButton onPress={onClose}/>
      <List
        data={devices}
        renderItem={({ item, index }) => (
          <DeviceItem
            key={index}
            name={item.name}
            onSelect={() => onDevicePress(item)}
            isPairing={isConnecting && item.name === currentDevice?.name}
            isLastElem={index === devices.length - 1}
          />
        )}
        ListFooterComponent={() => (
          <Scanning>
            <ActivityIndicator color={'#fff'} />
            <ScanningText>{'Scanning...'}</ScanningText>
          </Scanning>
        )}
      />
    </Container>
  );
};

//

export default ScanDevicesScreen;
