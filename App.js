import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import StartLoading from './src/asets/animations/StartLoading';
import StackNav from './src/routesNAV/StackNav';
import TryThis from './src/TryThis';
import DraggableExample from './src/TierListPart2';
import { View,Text } from 'react-native';
import TryV2 from './TierList/TryV2';

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