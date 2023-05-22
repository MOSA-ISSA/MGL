import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TheProvider from './Storge/thisProvider';
import TheContext from './Storge/thisContext';
import StartLoading from './src/asets/animations/StartLoading';
import StackNav from './src/routesNAV/StackNav';
import TryThis from './src/TryThis';


const App=()=> {
  const [load, setLoad] = React.useState(true);

  if (load) {
    return(
      <TheProvider>
      <TheContext.Consumer>
      {context => (
      <StartLoading setLoad={setLoad}/>
        // <TryThis/>
      )}
        </TheContext.Consumer>
      </TheProvider>
    )
  } else {
    return(
      <TheProvider>
        <TheContext.Consumer>
        {context => (
          <NavigationContainer >
            
              {/* <DrawerNav/> */}
              <StackNav/>
              {/* <TryThis/> */}

          </NavigationContainer>
        )}
        </TheContext.Consumer>
      </TheProvider>
    )
  }
  
  // return (
  //   <TheProvider>
  //       <TheContext.Consumer>
  //       {context => (
  //         <View style={{flex:1, backgroundColor: '#4545',}}>
  //             {/* <LogIn/> */}
  //             <NavigationContainer >
  //               <Stack.Navigator screenOptions={{animation:'slide_from_left'}}>
  //                 {/* <Stack.Screen name="try" component={TryThis}   options={{headerShown:false}}/> */}
  //                 <Stack.Screen name="a" component={StartLoading}   options={{headerShown:false}}/>
  //                 <Stack.Screen name="x" component={MyD}   options={{headerShown:false}}/>
  //               </Stack.Navigator>
  //             </NavigationContainer>
  //         </View>
  //       )}
  //       </TheContext.Consumer>
  //     </TheProvider>
  // );
}
{/* <Stack.Screen name="try" component={TryThis}   options={{headerShown:false}}/> */}
export default App;