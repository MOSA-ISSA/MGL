import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { globalHW } from '../../../Storge/global';

const Title=({titleName})=>(
    <View style={styles.titleView}>
        <Text style={styles.titleStyle}>{titleName}</Text>
    </View>
)

const styles = StyleSheet.create({
    titleView:{alignItems:'center',marginBottom:globalHW.windowWidth*0.1,},
    titleStyle:{
        fontSize: 30,
        fontWeight:'600',
        color:'#00bfff'
    },
})

export default Title;
