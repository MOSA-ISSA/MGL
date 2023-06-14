import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Draggable from 'react-native-draggable';

const DraggableExample = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [size, setSize] = useState({width: 100, height: 100});

  const handleDrag = (e,gestureState) => {
    const { moveX, moveY } = gestureState;
    setPosition({ x:moveX, y:moveY, z: position.z });
  };

  const onShortPressRelease = () => {
    setSize({width: size.width+10, height: size.height+10});
  };

  return (
    <View style={{ flex: 1 }}>
      <Draggable
        x={position.x}
        y={position.y}
        z={position.z}
        onDrag={handleDrag}
        onShortPressRelease={onShortPressRelease}
        // onRelease={handleRelease}
      >
        <View style={{ ...size, backgroundColor: 'red' }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {`x: ${position.x}, y: ${position.y}, z: ${position.z}`}
          </Text>
        </View>
      </Draggable>
    </View>
  );
};

export default DraggableExample;
