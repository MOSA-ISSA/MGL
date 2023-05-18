import React from 'react';
import {StyleSheet} from 'react-native';
import TheButton from '../TheButton';
import { globalHW } from '../../../Storge/global';

const RatingLinks = ({rating}) => {
    return (
        <TheButton
          buttonStyle={styles.linkButtons}
          buttonName={rating+'/10'} 
          buttonNameStyle={styles.gameInfoTitle}
          />
    );
}

const styles = StyleSheet.create({
    linkButtons:{
        height:globalHW.windowHeight*0.075,
        width:globalHW.windowHeight*0.075, 
        borderRadius:100,
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth:1,
        backgroundColor: '#26868d',
        marginVertical:3
    },
    gameInfoTitle:{
        fontSize:19,
        color:'white',
        fontWeight:'600'
    },
})

export default RatingLinks;
