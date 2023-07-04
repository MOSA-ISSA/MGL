import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';



const Loading = props => {
  // AsyncStorage.clear();

  const {User,setAdmin,admin} = useContext(TheContext)

  console.log('Loading');


  const restorData = async ()=>{
    let users = await AsyncStorage.getAllKeys()
    if (users.length!=0) {// if there user
      let i = 0
      let j = users.length
      users.forEach(async userID=> {
        let user = await AsyncStorage.getItem(userID)
        user = JSON.parse(user);// cast from string to data
        //console.log({...user});
        i++;
        console.log(i);
      if (user.logged) {
        j=0
        User.mail=user.mail
        User.ID=user.ID
        User.name= user.name,
        User.password= user.password,
        User.logged= user.logged,
        User.image = user.image,
        User.imageBackground = user.imageBackground,
        User.list=user.list
        props.navigation.navigate('UserScreen',{ key: Math.random()})
        //console.log("111111");
      }
      if (i==users.length&&j==users.length) {
        props.navigation.navigate('LogIn')
        //console.log("2");
      }
      })
    }else{
      props.navigation.navigate('LogIn')
    }
  }

  const renderAll=()=>{
    setAdmin(((admin+1)%3))
  }

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#199",}}>
          <Animatable.Image source={require('../../asets/images/reloud.png')}
          style={{height:150 ,width:150, borderRadius:100}}
          //onAnimationEnd={restorData}
          onLoad={()=>[restorData(),renderAll()]}
          animation={"rotate"}
          easing="linear" 
          iterationCount={'infinite'}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Loading;
