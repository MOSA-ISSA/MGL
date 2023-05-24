import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import { ScreenNames } from '../../../Storge/global';
import {useNavigation} from '@react-navigation/native';

const NavigateButton=({titleName})=>{

    const navigation = useNavigation();

    const navTo=()=>titleName?(
        titleName.replace(/\s+/g,'')==ScreenNames.LogIn?'Sign In':'Log In'
    ):null

    return(
        <TouchableOpacity style={navTo()=='Log In'?styles.navLogin:null} onPress={()=>navigation.navigate(navTo().replace(/\s+/g,''))}>
            <Text style={styles.navStyle}>{navTo()}...</Text>
        </TouchableOpacity>    
    )
}

const styles = StyleSheet.create({
    navLogin:{
        paddingHorizontal:20,
        alignItems:'flex-end',
    },
    navStyle:{
        fontSize: 15,
        marginLeft:20,
        color:'#1e90ff',
    },
})

export default NavigateButton;
