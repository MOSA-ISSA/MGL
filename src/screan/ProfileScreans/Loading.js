import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import { useNavigation } from '@react-navigation/native';



const Loading = props => {
  // AsyncStorage.clear();
  let navigation=useNavigation()
  const {User,setAdmin,admin} = useContext(TheContext)
  const [Load, setLoad] = useState(0);

  console.log('Loading');


  const restorData = async ()=>{
    let users = await AsyncStorage.getAllKeys()
    if (users.length!=0) {// if there user
      let i = 0
      let j = users.length
      users.forEach(async userID=> {
        let user = await AsyncStorage.getItem(userID)
        user = JSON.parse(user);// cast from string to data
        console.log({...user});
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
        props.navigation.navigate('UserScreen')
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

  const loadData=()=>{
    if (User.logged) {
      navigation.navigate('UserScreen')
    }else{
      props.navigation.navigate('LogIn')
    }
  }

  const renderAll=()=>{
    setAdmin(((admin+1)%3))
    setLoad(((admin+1)%3))
  }


  useEffect(() => {
    setTimeout(() => {
      console.log("test");
      loadData()
    }, 500);
  }, [Load]);
// loadData(),

    return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"#199",}}>
          <ActivityIndicator size="large" color="#454545" onLayout={()=>renderAll()}/>
          <Animatable.Image source={require('../../asets/images/reloud.png')}
          style={{height:0 ,width:0, borderRadius:100}}
          //onAnimationEnd={restorData}
          onLoad={()=>[renderAll()]}
          animation={"rotate"}
          easing="linear" 
          iterationCount={'infinite'}/>
        </View>
    );
}

const styles = StyleSheet.create({})

export default Loading;
