import React, { useState } from 'react';
import { View, PanResponder } from 'react-native';

const DraggableItem = () => {
  const [isMoving, setIsMoving] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: () => setIsMoving(true),
    onPanResponderRelease: () => setIsMoving(false),
    onPanResponderTerminate: () => setIsMoving(false),
  });

  return (
    <View
      {...panResponder.panHandlers}
      style={{
        width: 100,
        height: 100,
        backgroundColor: isMoving ? 'red' : 'green',
      }}
    />
  );
};

export default DraggableItem;