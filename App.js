import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import StackNav from './src/routesNAV/StackNav';

const App=()=> {

  return(
    <TheProvider>
      <TheContext.Consumer>
      {context => (
        <NavigationContainer >
          
            {/* <DrawerNav/> */}
            <StackNav/>

        </NavigationContainer>
      )}
      </TheContext.Consumer>
    </TheProvider>
  )
  
}
export default App;