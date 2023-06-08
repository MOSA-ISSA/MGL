import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Draggable from 'react-native-draggable'

const TryComponnent = () => {
  return (
    <View   style={{backgroundColor:'#4545'}}>
      <Text style={{fontSize: 20,}}>tryComponnent</Text>
      {/* <Draggable
        x={0}
        y={0}
        onDragRelease={(e,postion)=>{console.log(postion.moveY);}}
        // onDrag={handleDrag}
        // onRelease={()=>onRelease()}
        renderSize={56}
        renderColor="#6f7ddb"
        isCircle
        shouldReverse
      >
      </Draggable> */}
    </View>
  )
}

export default TryComponnent

const styles = StyleSheet.create({})