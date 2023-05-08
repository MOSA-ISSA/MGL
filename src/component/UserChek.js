import React, {useContext} from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import TheContext from '../../Storge/thisContext';

const {User} = useContext(TheContext)
export const checkLogIn =()=>{
  if (User.logged) {
    return(true)
  } else {
    return(false)
  }
}