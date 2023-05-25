import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';

const UserInput =({user,placeholder,keyboardType,value,type,UserCondition,disabledConditionBox})=>{
    const [Text, setText] = useState(value);
    const [hidePassword, setHidePassword] = useState(true);
    UserCondition(type)

    //  console.log(type);

    return(
        <View key={type} style={styles.inputBox}>
            <TextInput
                onChangeText={(v)=>{setText(v),user[type][0]=v}}
                value={Text}
                placeholder={placeholder}
                keyboardType={keyboardType}
                style={styles.textInout}
                secureTextEntry={placeholder=='password'?hidePassword:false}
            />
                {!disabledConditionBox?
                <View style={styles.showPasswordButton}>
                            <Image style={styles.img} source={user[type][1]?require('../../asets/images/Done.png'):require('../../asets/images/X.png')}/>         
                </View>:null
                }

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
    inputBox:{
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
        borderColor:'#199',
        marginHorizontal:3
    },
    UserCondition:{
        height:25,width:25,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'#199'
    },
    textInout:{
        fontSize:18,flexGrow:1
    },
    img:{height: '100%',width: "100%",},
})

export default UserInput;
