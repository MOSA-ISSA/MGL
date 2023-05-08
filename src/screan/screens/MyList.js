import React,{useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import RenderGameCard from '../../component/RenderGameCard';


const MyList = props => {

  const {User} = useContext(TheContext)

  
    
  return (
      <View style={{flex:1, backgroundColor: '#12171f',}}>
          <TheHeader textHeader={'My list'}/>

          <RenderGameCard games={User.list}/>

      </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {height: 20,width: 20, backgroundColor: '#199', borderRadius:20},
});

export default MyList;