import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import BackButton from './BackButton';
import TheButton from '../TheButton';

const HedMdal=({closeModal,onPressApply,type})=>(
    <View style={styles.sortModalContent} >

      <BackButton closeModal={closeModal}/>

      <Text style={styles.title}>{type} :</Text>

      <TheButton
        buttonName={"Apply"}
        buttonStyle={styles.ButtonStyle}
        buttonNameStyle={{ fontSize: 20, }}
        onPress={() => onPressApply()}
      />

    </View>
  )

const styles = StyleSheet.create({
    sortModalContent: {
        width: '100%',
        borderBottomWidth: 1,
        margin: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderStyle: 'dashed'
    },
    title: { fontSize: 30, fontWeight: '700', paddingBottom: 3 },
    ButtonStyle: {
        backgroundColor: '#199',
        height: 40, width: 60,
        borderRadius: 10
      },
})

export default HedMdal;
