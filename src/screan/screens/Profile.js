import React from 'react';
import {View,} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Loading from '../ProfileScreans/Loading';
import UserScreen from '../ProfileScreans/UserScreen';
import LogIn from '../ProfileScreans/logIn';
import SignIn from '../ProfileScreans/signIn';
import MyList from './MyList';


export default function Profile(props) {

  const Stack = createNativeStackNavigator();

  return (
    <View style={{flex:1, backgroundColor: '#4545',}}>
        <Stack.Navigator screenOptions={{animation:'flip'}}>
          <Stack.Screen name="Loading" component={Loading}   options={{headerShown:false}}/>
          <Stack.Screen name="UserScreen" component={UserScreen} options={{headerShown:false}}/>
          <Stack.Screen name="LogIn" component={LogIn}   options={{headerShown:false}}/>
          <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
        </Stack.Navigator>
    </View>
  );
}

