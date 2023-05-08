import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { globalHW, globalStyles } from '../../Storge/global';

const GamesCard=(props)=> {


  return (
    <TouchableOpacity style={styles.GamesCardContiner}
         onPress={props.onPress}>

        <View style={styles.ImageContiner}>
          <Image
            source={{uri: props.item.image}}
            style={styles.ImageSt}/>
        </View>

        <View style={styles.TextContiner}>
          <Text style={styles.TextSt}>{props.item.gameShortName}</Text>
          { props.children }
        </View>

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  GamesCardContiner:{
    paddingBottom: 30,
    padding:globalHW.windowWidth*0.01,
    height:(globalHW.windowHeight*0.31),
    width:(globalHW.windowWidth*0.333),
    elevation:10,
  },
  ImageContiner:{
    width:'100%',
    height: '100%', 
    backgroundColor:'#4545',
    padding:1
  },
  ImageSt:{
    height: '100%',
    width: '100%',
    borderRadius:3 , 
    resizeMode:'contain'
  },
  TextContiner:{
    width:'100%', 
    flexDirection:'row', 
    justifyContent:'space-between',
    padding:5
  },
  TextSt:{
    fontSize: 18,
    fontWeight: 'bold',
    color:'#fff',
    opacity:0.9
  },
})

export default GamesCard