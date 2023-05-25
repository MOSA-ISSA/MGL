import React,{useContext,useState,useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import RenderGameCard from '../../component/RenderGameCard';
import OptionButton from '../../component/MyListComponent/optionButton';


const MyList = () => {
  console.log('MyList');

  const {User} = useContext(TheContext)
  
  const [option,setOption] =useState('playing')


  const RenderOptionsButtons =()=>{
    const options =['played','planToPlay','playing','trash']

    const pressedbutton =(item)=>(
      {
        color:item==option?'#c0c0c0':'#9999',
        backgroundColor:item==option?'#4c4c4c':null,
      }
    )

    return(
      <View style={styles.options}>
        {options.map((option)=>
          <OptionButton 
            key={option} 
            option={option} 
            pressedbutton={pressedbutton}
            setOption={setOption}
          />
        )}
      </View>
    )
  }
    
  return (
      <View style={{flex:1, backgroundColor: '#12171f',}}>
          <TheHeader textHeader={'My list'}/>

          <RenderOptionsButtons/>

          <RenderGameCard games={User.list[option]}/>

      </View>
  );
}

const styles = StyleSheet.create({
  options:{
    // height:100,
    width: '100%',
    backgroundColor:'#5555',
    flexDirection:'row'
  },
});

export default MyList;