import React, { useState } from 'react';
import { Modal, StyleSheet,Pressable, View,} from 'react-native';
import { Image } from 'react-native-animatable';

const ShowImg = ({pressed,close,Img}) => {

  if(pressed){
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          close(false);}}>
        <Pressable style={styles.TheView} onPress={() => close(false)}>
          <Image
            source={{
              uri: Img,
            }}
            style={{height: 350, width: 350, marginHorizontal:20,borderRadius:100}}/>
        </Pressable>
      </Modal>
    )}
    else{
      return(null)
    }
}

const styles = StyleSheet.create({
  TheView:{
    flex:1,
    backgroundColor:'#4545',
    justifyContent:'center',
    alignItems: 'center',
  }
})

export default ShowImg;