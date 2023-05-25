import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image ,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfoInput=({value,keyboardType,placeholder})=>{
    const [edit, setedit] = useState(false)
    const [changingText, setChangedText] = useState(value?value:'text');

    return (
        <View style={styles.viewText}>
             <Text style={styles.text} >{"item.infoType"+" : "}</Text>
             <TextInput
                editable={edit}
                style={[styles.text,{flexGrow:1}]}
                onChangeText={(text)=>setChangedText(text)}
                value={changingText}
                keyboardType={keyboardType?keyboardType:'default'}
                placeholder={placeholder?placeholder:edit?'Enter text':'disabeld'}
            />
            <TouchableOpacity style={styles.editButton} onPress={()=>setedit(!edit)}>
                <Image 
                    style={styles.ImgBackground}
                    source={!edit?require('../../asets/images/edit.png'):null
                    // UserCondition(item.infoType)?require('../../asets/images/Done.png'):require('../../asets/images/X.png')
                }
                />
            </TouchableOpacity>

        </View>
    )

}

const styles = StyleSheet.create({
    viewText :{
        borderWidth:2,
        margin:10,
        paddingHorizontal: 10,
        borderColor: '#199',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    text :{
        fontSize:20,
        fontWeight:'500',
        color:'#199',
        margin:5
    },
    ImgBackground:{
        height: '100%', width: '100%',
        alignItems:'flex-end',
        marginBottom:60,
        shadowOffset:{width:80,height:80},
        shadowColor:'#4545',
        shadowOpacity:0.8,
        borderRadius:10
    },
    editButton:{
        height:30,width:30,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#199',
        padding:2,
        backgroundColor: '#297164',
    },
})

export default InfoInput
