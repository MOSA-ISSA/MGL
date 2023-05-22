import React from 'react';
import {View, StyleSheet} from 'react-native';
import TheButton from '../TheButton';

const OptionButton = ({option,pressedbutton,setOption,}) => {
    return (
        <View style={styles.option}>
            <TheButton 
              buttonName={option}
              buttonNameStyle={[styles.buttonNameStyle,pressedbutton(option),]}
              buttonStyle={pressedbutton(option)}
              onPress={()=>setOption(option)}
              />
          </View>
    );
}

const styles = StyleSheet.create({
    option:{
        flex:1,
        borderWidth:1,
        borderColor:'black',
        // marginHorizontal:1
      },
      buttonNameStyle:{
        fontSize: 20,
        color:'#9999'
      },
})

export default OptionButton;
