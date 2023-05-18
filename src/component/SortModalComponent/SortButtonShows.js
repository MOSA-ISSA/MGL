import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import { globalHW } from '../../../Storge/global';

const SortButtonShows=({Type,setSortTypeButtonShowsModal,setSortModalVisible,setType})=>(
    <TouchableOpacity style={styles.sortModalButton}
        onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType(Type)}}>
        <Text style={styles.SortButtonShowsText}>{Type}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    sortModalButton:{
        flex:1, borderRadius:10, alignItems:'center', justifyContent:'center', paddingHorizontal:5, margin:5,
          marginVertical:15,backgroundColor:"#179999",
      },
    SortButtonShowsText:{
        fontSize:globalHW.windowWidth*0.05,
    },
})

export default SortButtonShows;
