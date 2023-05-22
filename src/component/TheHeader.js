import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { globalHW } from '../../Storge/global';
import TheButton from './TheButton';
import TheContext from '../../Storge/thisContext';

const TheHeader = (props) => {
 const {textHeader} = props
  const navigation = useNavigation();
  const {setAdmin,admin} = useContext(TheContext)

  const goBack=()=>{
      setAdmin(((admin+1)%3))
      navigation.goBack()
  }


  // useEffect(() => {
  //   // component did load 

  //   return ()=> {
  //     //component will unmount
  //   }
  // }, [])

  return (
    <View style={styles.container}>
        <TheButton buttonName={"<"} buttonNameStyle={styles.title} buttonStyle={styles.btn} onPress={()=>goBack()}/>
        <View style={{flexGrow:1,alignItems:'center'}}>
          <Text style={styles.title}>
          {textHeader}
          </Text>
        </View>
        { props.children }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#199',
    height: globalHW.windowHeight*0.055,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10,
    elevation:50,
    borderWidth:3,
    borderColor:'#4545',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: '#454545',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal:15
  },
  title: {
    color: '#fff',
    fontSize: 24,
    // borderWidth:1 , 
  },
  btn:{
    paddingHorizontal:20, 
    // borderWidth:1 , 
    marginLeft: -20
  }
});

export default TheHeader;
  