import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react';
import SignIn from "../screan/ProfileScreans/signIn";
import GameDetails from "../screan/screens/GameDetails";
import MyList from "../screan/screens/MyList";
import DrawerNav from "./drawer";
import TagsScreen from "../screan/screens/TagsScreen";
import { ScreenNames } from "../../Storge/global";
import StartLoading from "../asets/animations/StartLoading";

const StackNav=()=> {
  const Stack = createNativeStackNavigator();
  return (
   
      <Stack.Navigator 
        screenOptions={{animation:"slide_from_left"}}
        initialRouteName="StartLoading"
      >
        <Stack.Screen name={ScreenNames.StartLoading} component={StartLoading} options={{headerShown:false}} />
        <Stack.Screen name={ScreenNames.DrawerNav} component={DrawerNav} options={{headerShown:false,animation:"fade"}} />
        <Stack.Screen name={ScreenNames.GameDetails} component={GameDetails} options={{headerShown:false,animation:"fade"}} />
        <Stack.Screen name={ScreenNames.SignIn} component={SignIn} options={{headerShown:false}}/>
        <Stack.Screen name={ScreenNames.MyList} component={MyList} options={{headerShown:false}}/> 
        <Stack.Screen name={ScreenNames.TagsScreen} component={TagsScreen} options={{headerShown:false}}/>
    
      </Stack.Navigator> 
  );
}
export default StackNav
