import { createDrawerNavigator } from '@react-navigation/drawer';
import About from '../screan/screens/about';
import { DrawerContent } from './DrawerContent';
import AllGames from '../screan/screens/AllGames';
import Loading from '../screan/ProfileScreans/looding';
import UserScreen from '../screan/ProfileScreans/UserScreen';
import LogIn from '../screan/ProfileScreans/logIn';
import { ScreenNames } from '../../Storge/global';
// import StackNav from './StackNav';

const Drawer = createDrawerNavigator();

const DrawerNav=()=> {

  return (
    
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      drawerStyle:{
        borderTopEndRadius:15,
        borderBottomEndRadius:15,
      },
      headerStyle: {
        backgroundColor: '#199',
      },
    }}>

      <Drawer.Screen name={ScreenNames.AllGames} component={AllGames} options={{}} />
      <Drawer.Screen name={ScreenNames.About} component={About} />

          <Drawer.Screen name={ScreenNames.Loading} component={Loading}   options={{headerShown:false}}/>
          <Drawer.Screen name={ScreenNames.UserScreen} component={UserScreen} options={{headerShown:false,}}/>
          <Drawer.Screen name={ScreenNames.LogIn} component={LogIn}   options={{headerShown:false,}}/>
      
      {/* <Drawer.Screen name="StackNav" component={StackNav} options={{headerShown:false}}/> */}

    </Drawer.Navigator>
  );
}

export default DrawerNav

