import {View,} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import { ScreenNames } from '../../../Storge/global';
import LogSignInComponent from '../../component/logSignInComponent/logSignInComponent';

const SignIn =props=>{
    console.log('SignIn');
    //AsyncStorage.clear();

    const {User,image,imageBackground} = useContext(TheContext)
    const [alertCondition, setAlert] = useState("");
    const user = {
        mail:'',
        userName:'',
        password:'',
    }

    const userCondition = () => {
        if (user.mail.length === 0 && user.userName.length === 0 && user.password.length === 0) {
            setAlert('Please enter data');
            return false;
        }

        if (user.mail.includes(' ')) {
            setAlert('Mail should not include spaces');
            return false;
        }
        
        if (!user.mail.includes('@')) {
            setAlert('Mail should include @');
            return false;
        }
        
        if (!user.mail.includes('.com')) {
            setAlert('Mail should include .com');
            return false;
        }
        
        if (user.userName.includes(' ')) {
            setAlert('Username should not include spaces');
            return false;
        }
        
        if (user.userName.length < 4) {
            setAlert('Username length should be at least 4');
            return false;
        }
        
        if (user.password.length < 8) {
            setAlert('Password length should be at least 8');
            return false;
        }
        
        setAlert('');
        return true;
    };
          

    const signIn = async () => {//set data and log in
        let users = await AsyncStorage.getAllKeys()
        if (!users.includes(user.userName)) {
            if (userCondition()) {
                User.mail=user.mail
                User.name=user.userName
                User.password=user.password
                User.logged=true
                User.image =image
                User.imageBackground = imageBackground
                User.list={
                    played:[],
                    planToPlay:[],
                    playing:[],
                    trash:[],
                  }

                AsyncStorage.setItem(User.name, JSON.stringify(User));
                props.navigation.navigate(ScreenNames.Loading)
            }
        }else{
            setAlert('Another user with this name already exists')
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"#0d516a"}}>
            <TheHeader textHeader={'MGL'}/>

            <LogSignInComponent
                titleName={'Sign In'}
                alertCondition={alertCondition}
                LogSignInButton={signIn}
                user={user}
            />
          
        </View>
    )
}

export default SignIn