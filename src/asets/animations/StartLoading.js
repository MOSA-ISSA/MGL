import LottieView from 'lottie-react-native';
import React, { useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import {useNavigation} from '@react-navigation/native';
import { ScreenNames } from '../../../Storge/global';

const StartLoading = props => {
  // AsyncStorage.clear();

  const navigation = useNavigation();
  const {User} = useContext(TheContext)

  console.log('StartLoading');
  // console.log(props.setLoad)
  // props.setLoad(true)

    const restorData = async ()=>{
        let users = await AsyncStorage.getAllKeys()
        if (users.length!=0) {// if there user
          users.forEach(async username=> {
            let user = await AsyncStorage.getItem(username)
            user = JSON.parse(user);// cast from string to data
            if (user.logged) {
              User.mail=user.mail
              User.name= user.name,
              User.password= user.password,
              User.logged= user.logged,
              User.image = user.image,
              User.imageBackground = user.imageBackground,
              User.list=user.list
            }
          })
          //props.navigation.navigate('x')
        }
      }

    return (
        <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:"#0d516a"}}>
            <LottieView 
            speed={2}
            source={require('./StartLoudingAnimation.json')}
            autoPlay
            loop={false}
            resizeMode={'center'}
            //onAnimationLoop={restorData()}
            onLayout={restorData}
            onAnimationFinish={()=>navigation.replace(ScreenNames.DrawerNav)}
            //()=>props.navigation.navigate('x')
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default StartLoading;
