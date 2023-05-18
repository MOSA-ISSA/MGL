import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function Card(props) {
  return (
    <TouchableOpacity 
      style={[styles.card,props.style]}
      onPress={props.onPress}
    >
        { props.children }
    </TouchableOpacity>
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