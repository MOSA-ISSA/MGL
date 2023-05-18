import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const BackButton =({closeModal})=>(
    <TouchableOpacity onPress={() =>closeModal()}>
      <Text style={{ fontSize: 30 }}> {'<'} </Text>
    </TouchableOpacity>
  )

export default BackButton;
