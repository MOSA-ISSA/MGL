import React from 'react';
import { StyleSheet,Text} from 'react-native';
import Card from './card';

export default function SectionsCard(props) {
  return (
    <Card onPress={props.onPress}>
      <Text style={[styles.SectionText,props.TextStyle]}>{props.name}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  SectionText: {fontSize: 20, color:'black', fontWeight: '500',},
});