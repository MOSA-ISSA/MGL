import React from 'react';
import {View, StyleSheet} from 'react-native';
import TheButton from '../TheButton';

const OnDoneEditing=({LogSignInButton,titleName})=>(
    <View style={{margin: 20}}>
        <TheButton 
            buttonName={titleName?titleName:'done'}
            onPress={LogSignInButton?()=>LogSignInButton():null}
            buttonNameStyle={styles.buttonNameStyle}
            buttonStyle={styles.buttonStyle}
        />
    </View>
)

const styles = StyleSheet.create({
    buttonStyle:{
        borderWidth:2
        ,margin:10,
        paddingLeft: 10,
        borderColor: '#199',
        borderRadius:10,
        backgroundColor:'#296e62'
    },
    buttonNameStyle:{
        fontSize: 30,
        fontWeight:'600',
        color:'#fff'
    },
})

export default OnDoneEditing;
