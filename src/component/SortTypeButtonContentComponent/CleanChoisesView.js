import React from 'react';
import {StyleSheet} from 'react-native';
import TheButton from '../TheButton';

const CleanChoisesView=({CleanChoises})=>(
    <TheButton 
      buttonName={"Clean"}
      buttonStyle={styles.ButtonStyle}
      buttonNameStyle={{ fontSize: 15, }}
      onPress={() => CleanChoises()}
    />
  )

const styles = StyleSheet.create({
    ButtonStyle: {
        backgroundColor: '#199',
        height: 40, width: 60,
        borderRadius: 10
      },
})

export default CleanChoisesView;
