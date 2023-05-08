import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import DrawerNav from './src/routesNAV/drawer';
import StackNav from './src/routesNAV/StackNav';




const App=()=> { 
  const Stack = createNativeStackNavigator();
    return (
      <View style={{flex:1, backgroundColor: '#4545',}}>
      <NavigationContainer>
        {/* <MyD/> */}
        <StackNav/>
      </NavigationContainer>
      
      </View>
    );

}

export default App;
