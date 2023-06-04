import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image ,StyleSheet,TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../Storge/global';


const UserScreenInfoInput=({type,value,keyboardType,placeholder,})=>{
    const navigation = useNavigation();

    const {User,image,imageBackground} = useContext(TheContext)
    const [edit, setedit] = useState(false)
    const [changingText, setChangedText] = useState(value?value:'text');

    const UserCondition =()=>{
        if (type=='password'&&changingText.length>7) {
          return true
        }if (type=='name'&&changingText.length>3&&!changingText.includes(" ")) {
          return true
        }if (type=='mail'){
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(changingText)) {
            return true
          }
        }else{
          false
        }
      }

    const UplodChanges = async() =>{// UplodChanges
        AsyncStorage.setItem(User.name, JSON.stringify(User));
    }

    const ChangingUserNameAndChangingTheKey =async(newName)=>{
        let users = await AsyncStorage.getAllKeys()
        if (!users.includes(newName)) {
          User.logged=false
          UplodChanges()
          let newUser ={...JSON.parse(await AsyncStorage.getItem(User.name))}
          newUser.name=newName;
          AsyncStorage.removeItem(User.name);
          AsyncStorage.setItem(newUser.name, JSON.stringify(newUser));
            User.mail=''
            User.name= '',
            User.password= '',
            User.logged= false,
            User.image = image,
            User.imageBackground = imageBackground,
            User.list={played:[],planToPlay:[],playing:[],trash:[],}
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenNames.Loading }]
            })
          )
          //AsyncStorage.removeItem
        }else{
          Alerts.alertNameIncludes()
        }
      }

    const Alerts={
        alertchangingName: ()=>
        Alert.alert('changing name will cuse logging out', '!', [
          {
            text: 'Cancel', onPress: () =>{setedit(false)},
          },
          {
            text: 'OK', onPress: () =>{setedit(true)}
          },
        ]),
        alertNameIncludes: ()=>
        Alert.alert('thare anther user in this userName', '!', [
          {
            text: 'ok',
          },
        ]),
    }

    const onPressedit=()=>{
        if (type=='name') {
            !edit?Alerts.alertchangingName():null
            edit&&UserCondition(changingText)? ChangingUserNameAndChangingTheKey(changingText):setChangedText(value?value:'')
            setedit(false)
            // ChangingUserNameAndChangingTheKey(changingText)
            return
        }
        if (!edit||UserCondition(changingText)) {
            User[type]=changingText
            UplodChanges()
            setedit(!edit)
        } else {
            setChangedText(value?value:'')
            setedit(!edit)
        }
    }

    return (
        <View style={styles.viewText}>
             <Text style={styles.text} >{type?type+" :":"type : "}</Text>
             <TextInput
                editable={edit}
                style={[styles.text,{flexGrow:1}]}
                onChangeText={(text)=>setChangedText(text)}
                value={changingText}
                keyboardType={keyboardType?keyboardType:'default'}
                placeholder={placeholder?placeholder:edit?'Enter text':'disabeld'}
                placeholderTextColor={'#096562'}
            />
            <TouchableOpacity style={styles.editButton} onPress={()=>onPressedit()}>
                <Image 
                    style={styles.ImgBackground}
                    source={!edit?require('../../asets/images/edit.png'):
                    UserCondition(changingText)?require('../../asets/images/Done.png'):require('../../asets/images/X.png')
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

export default UserScreenInfoInput
