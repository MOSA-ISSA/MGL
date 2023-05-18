import React from 'react';
import {StyleSheet, Text} from 'react-native';

const InfoText = ({item,info}) => {
    return (
        <Text style={styles.gameInfo}>{item[info.item]}</Text>
    );
}

const styles = StyleSheet.create({
    gameInfo:{
        color:'#247b81'
      }
})

export default InfoText;
