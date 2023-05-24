import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

const UserInput =({user,placeholder,keyboardType,value,type})=>{
    const [Text, setText] = useState(value);
    const [hidePassword, setHidePassword] = useState(true);

    //  console.log(user);

    return(
        <View style={placeholder=='password'?styles.passwordBox:styles.userBox}>
            <TextInput
                onChangeText={(v)=>{setText(v),user[type]=v}}
                value={Text}
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={styles.textInout}
                secureTextEntry={placeholder=='password'?hidePassword:false}
            />
            {placeholder=='password'?
                <TouchableOpacity style={styles.showPasswordButton} onPress={()=>setHidePassword(!hidePassword)}>
                            <Image 
                                style={styles.img} source={require('../../asets/images/showPasword.png')}/>
                </TouchableOpacity>:null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    userBox:{
        borderWidth:2
        ,margin:10,
        paddingLeft: 10,
        borderColor: '#199',
        borderRadius:10,
        backgroundColor:'#296e62'
    },
    passwordBox:{
        borderWidth:2
        ,margin:10,
        paddingHorizontal: 10,
         flexDirection:'row' ,
         alignItems:'center',
         justifyContent:'space-between',
         borderRadius:10,borderColor: '#199',
         backgroundColor:'#296e62'
    },
    showPasswordButton:{
        height:25,width:25,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'#199'
    },
    textInout:{
        fontSize:18,flexGrow:1
    },
    img:{height: '100%',width: "100%",}
})

export default UserInput;
