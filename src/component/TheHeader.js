import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
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

  return (
    <View style={styles.container}>
        <TheButton buttonName={"<"} buttonNameStyle={styles.title} onPress={()=>goBack()}/>
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
  },
});

export default TheHeader;
  