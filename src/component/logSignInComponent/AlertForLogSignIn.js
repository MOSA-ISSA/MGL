import React from 'react';
import {Text, StyleSheet} from 'react-native';

const AlertForLogSignIn =({alertCondition})=>(
        alertCondition?<Text style={styles.alertStyle}>{alertCondition}</Text>:null
    )

const styles = StyleSheet.create({
    alertStyle:{
        fontSize: 20,
         marginLeft:20,
          color:'#c41e3a'
    },
})

export default AlertForLogSignIn;
