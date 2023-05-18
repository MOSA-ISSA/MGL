import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { globalHW, globalImage } from '../../../Storge/global';
import ChoisesButtonView from './ChoisesButtonView';

const Choises =({item})=>{

    const RenderChoisesButton=({choicses})=>{
      const buttons=[
        {
          onPress:choicses.onPress1,
          buttonView:choicses.text?'(A-Z)':globalImage.LowToHigh,
        },
        {
          onPress:choicses.onPress2,
          buttonView:choicses.text?'(Z-A)':globalImage.HighToLow,
        }
      ]
      return(
        buttons.map((item,i)=>(
          <ChoisesButtonView choicses={choicses} item={item} key={i}/>
        ))
      )
    }
  
  return (
    <View style={styles.sortModalContent}>

      <Text style={styles.ChoisesButtonViewText}>{item.choice}</Text>

      <View style ={{flexDirection:'row'}}>
        <RenderChoisesButton key={item} choicses={item}/>
      </View>

    </View>
  )}

const styles = StyleSheet.create({
    sortModalContent:{
        width:'100%', borderBottomWidth:1, margin:5, padding:10, alignItems:'center',
        justifyContent:'space-between', flexDirection:'row', borderStyle:'dashed'
      },
    ChoisesButtonViewText:{
        fontSize:globalHW.windowWidth*0.05,
    },

})

export default Choises;
