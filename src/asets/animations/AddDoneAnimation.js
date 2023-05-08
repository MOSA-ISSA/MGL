import LottieView from 'lottie-react-native';
import React, { useContext} from 'react';
import {View, StyleSheet} from 'react-native';

const AddDoneAnimation =props=>{

    return (
        <View style={{flex:1,alignContent:'center',justifyContent:'center',}}>
            <LottieView 
            speed={2}
            source={require('./AddDoneAnimation.json')}
            autoPlay
            loop={false}
            resizeMode={'center'}
            //onAnimationLoop={restorData()}
            //onLayout={restorData}
            onAnimationFinish={()=>props.setModalVisible(false)}
            //()=>props.navigation.navigate('x')
            />
        </View>
    )
}

export default AddDoneAnimation