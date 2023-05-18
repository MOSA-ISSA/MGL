import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { globalHW } from '../../../Storge/global';

const ChoisesButtonView=({choicses,item})=>(
    <TouchableOpacity
          style={styles.sortModalButtonChoice} 
          onPress={item.onPress}>

          {choicses.text?
          <Text style={styles.ChoisesButtonViewText}>{item.buttonView}</Text>:
          <Image
          source={{uri: item.buttonView}}
          style={styles.ChoisesButtonViewImage}/>}
    </TouchableOpacity>
  )

const styles = StyleSheet.create({
    sortModalButtonChoice:{
        marginHorizontal:4, 
        padding:3, 
        borderRadius:10,
        opacity: 0.7,
        backgroundColor:'#00827f'
    },
    ChoisesButtonViewText:{
        fontSize:globalHW.windowWidth*0.05,
    },
    ChoisesButtonViewImage:{
        width: globalHW.windowWidth*0.07,
        height: globalHW.windowWidth*0.07,
      },
})

export default ChoisesButtonView;
