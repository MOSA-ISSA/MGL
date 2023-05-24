import React from 'react';
import {TouchableOpacity, StyleSheet ,Text} from 'react-native';

const PasswordFoeget=({foegetPassword,handilingfoegetPassword})=>(
    foegetPassword>2?
    <TouchableOpacity onPress={handilingfoegetPassword}>
        <Text style={styles.foegetPasswordStyle}>{"foeget Password..."}</Text>
    </TouchableOpacity>:null
)

const styles = StyleSheet.create({
    foegetPasswordStyle:{
        fontSize: 15,
        marginLeft:20,
        color:'skyblue'
    },
})

export default PasswordFoeget;
