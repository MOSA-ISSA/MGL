import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import StackNav from './src/routesNAV/StackNav';

const App=()=> {

  return(
    <TheProvider>
        <NavigationContainer >
            {/* <DrawerNav/> */}
            <StackNav/>
        </NavigationContainer>
    </TheProvider>
  )
  
}
export default App;