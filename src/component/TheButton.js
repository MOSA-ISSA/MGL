import React from "react"
import { View, Text, TouchableOpacity, } from 'react-native';

const TheButton = ({buttonName,buttonNameStyle,onPress,buttonStyle,}) => {// need improve

    return(
        <TouchableOpacity style={[{alignItems: 'center',justifyContent:"center"},buttonStyle]} onPress={onPress}>
                <Text style={[{fontSize:30,color:'#fff'},buttonNameStyle]} >
                                    {buttonName}
                </Text>
        </TouchableOpacity>
    )
}

export default TheButton