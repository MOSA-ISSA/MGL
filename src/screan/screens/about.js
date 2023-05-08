import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TheButton from '../../component/TheButton';
import { globalStyles } from '../../../Storge/global';

export default function About(props) {
  return (
    <View style={globalStyles.container}>
      <Text>About Screen</Text>
      <TheButton buttonName={"bb"} buttonStyle={{margin: 10, backgroundColor: 'red',}} onPress={()=>{props.navigation.navigate('UserScreen')}} />
    </View>
  );
}