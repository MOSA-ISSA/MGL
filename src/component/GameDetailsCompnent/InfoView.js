import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import InfoText from './InfoText';

const InfoView = ({item,info}) => {
    return (
        <View key={info.item}>
            <Text style={styles.sideHeaders}>{info.item}</Text>
            {info.Render?info.Render:null}
            {info.text?<InfoText item={item} info={info}/>:null}
        </View>  
    );
}

const styles = StyleSheet.create({
    sideHeaders: {
        fontSize: 20,
        backgroundColor: '#247b81',
      },
})

export default InfoView;
