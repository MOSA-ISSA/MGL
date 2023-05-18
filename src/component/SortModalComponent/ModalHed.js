import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const ModalHed=({sortData,closeModal})=>(
    <View style ={styles.SortModalHed}>
      <Text style={styles.title}>sort by -</Text>

      <TouchableOpacity  onPress={()=>[sortData.reSort(),closeModal()]}>
      <Text style={styles.ReSORT}>ReSORT</Text>
      </TouchableOpacity>
    </View>
  )

const styles = StyleSheet.create({
    SortModalHed:{
        height:'20%' ,width:'90%', flexDirection:'row',
        justifyContent:'space-between',paddingTop:5
    },
    title:{
        fontSize:30, 
        fontWeight:'700',
        paddingBottom:3
    },
    ReSORT:{
        fontSize:20,
        fontWeight:'500'
    },
})

export default ModalHed;
