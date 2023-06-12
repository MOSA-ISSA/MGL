import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import StartLoading from './src/asets/animations/StartLoading';
import StackNav from './src/routesNAV/StackNav';
import TryThis from './src/TryThis';
import { View,Text } from 'react-native';

const App=()=> {

  return(
    <TheProvider>
      <TheContext.Consumer>
      {context => (
        <NavigationContainer >
          
            {/* <DrawerNav/> */}
            {/* <StackNav/> */}
            <TryThis/>

            {/* <View>
              <Text>
                hello
              </Text>
            </View> */}

        </NavigationContainer>
      )}
      </TheContext.Consumer>
    </TheProvider>
  )
  
}
export default App;