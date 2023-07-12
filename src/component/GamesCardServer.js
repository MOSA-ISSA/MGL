import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {globalHW,} from '../../Storge/global';
import AddGametoListButton from './AddGametoListButton';

const GamesCardServer = (props) => {
  const nullImage="https://cdn.iconscout.com/icon/premium/png-128-thumb/controll-360010.png"
  // console.log(props.item);

  return (
    <TouchableOpacity style={styles.GamesCardContiner}
      onPress={props.onPress}>

      <View style={styles.ImageContiner}>
        <Image
          source={{ uri: props?.item?.background_image?props.item.background_image:nullImage }}
          style={styles.ImageSt} />
      </View>

      {props.HideUnderCard?null:
        <View style={styles.TextContiner}>
          
          <Text style={styles.TextSt}>{props.item?.name?props.item.name:"gameNmae"}</Text>
          <AddGametoListButton 
            item={props.item} 
            buttonStyle={styles.AddOrRemoveButton}
            buttonNameStyle={{fontSize:15}}
            needToRender={props.needToRender}
            />
            
        </View>
      }

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  GamesCardContiner: {
    paddingBottom: 30,
    padding: globalHW.windowWidth * 0.01,
    height: (globalHW.windowHeight * 0.31),
    width: (globalHW.windowWidth * 0.333),
    elevation: 10,
  },
  ImageContiner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4545',
    padding: 1
  },
  ImageSt: {
    height: '100%',
    width: '100%',
    borderRadius: 3,
    resizeMode: 'contain'
  },
  TextContiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  TextSt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    opacity: 0.9
  },
  AddOrRemoveButton: {
    height: 20, width: 20,
    backgroundColor: '#199',
    borderRadius: 20
  },
})

export default GamesCardServer