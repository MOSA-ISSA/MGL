import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Card(props) {
  return (
    <View style={[styles.card,props.style]}>
        { props.children }
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    borderWidth:3,
    borderColor:'#299',
    backgroundColor: '#0d869a',
    elevation: 3,
    margin: 3,
    alignItems:'center',
    padding:2,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});