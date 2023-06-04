// In App.js in a new project

import * as React from 'react';
import { View, Text, TouchableOpacity,Button, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ImagePicker from 'react-native-image-crop-picker';
import LogIn from './src/screan/ProfileScreans/logIn';
import SignIn from './src/screan/ProfileScreans/signIn';
import UserScreen from './src/screan/ProfileScreans/UserScreen';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import Loading from './src/screan/ProfileScreans/Loading';
import TryThis from './src/TryThis';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

function App() {
  
  return (
    <TheProvider>
        <TheContext.Consumer>
        {context => (
          <View style={{flex:1, backgroundColor: '#4545',}}>
              {/* <LogIn/> */}
              <NavigationContainer >
                <Stack.Navigator screenOptions={{animation:'slide_from_left'}}>
                  {/* <Stack.Screen name="try" component={TryThis}   options={{headerShown:false}}/> */}
                  <Stack.Screen name="Loading" component={Loading}   options={{headerShown:false}}/>
                  <Stack.Screen name="UserScreen" component={UserScreen} options={{headerShown:false}}/>
                  <Stack.Screen name="LogIn" component={LogIn}   options={{headerShown:false}}/>
                  <Stack.Screen name="SignIn" component={SignIn} options={{headerShown:false}}/>
                </Stack.Navigator>
              </NavigationContainer>
          </View>
        )}
        </TheContext.Consumer>
      </TheProvider>
  );
}

//export default App;
