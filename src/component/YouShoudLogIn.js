import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

const YouShoudLogIn = (navigation) => {
    // console.log(navigation);
    // const navigation = useNavigation();

    Alert.alert('you are not logged', 'Do you have an user', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'log in', onPress: () => navigation.navigate('LogIn')},
        {text: 'sign in', onPress: () => navigation.navigate('SignIn')},
      ]);
}

export default YouShoudLogIn;
