import React from "react"
import {Text, TouchableOpacity, } from 'react-native';

const TheButton = ({buttonName,buttonNameStyle,onPress,buttonStyle,disabled}) => {// need improve

    return(
        <TouchableOpacity 
            style={[{alignItems: 'center',justifyContent:"center"},buttonStyle]} 
            onPress={onPress?onPress:null}
            disabled={disabled}
        >
                <Text style={[{fontSize:30,color:'#fff'},buttonNameStyle]} >
                                    {buttonName}
                </Text>
        </TouchableOpacity>
    )
}

export default TheButton