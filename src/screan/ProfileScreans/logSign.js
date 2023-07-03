import {View,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import { ScreenNames,} from '../../../Storge/global';
import LogSignInComponent from '../../component/logSignInComponent/logSignInComponent';
import { mailCondition, passwordCondition, userIDCondition,} from '../../userCoditions';

    const {User,image,imageBackground} = useContext(TheContext)
    const [alertCondition, setAlert] = useState("");
    const [user,setUser]=useState({
        mail:{text:'',validation:false},
        userName:{text:'',validation:false},
        userID:{text:'',validation:false},
        userPassword:{text:'',validation:false},
    })
    const [users, setUsers] = useState(false);

    const restorUsers = async () => {
        try {
            let users = await AsyncStorage.getAllKeys();
            // console.log(users)
            setUsers(users)
            return
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    };
    useEffect(() => {
        restorUsers()
        console.log(users);
    }, []);

    export default {User,image,imageBackground,alertCondition,setAlert,users, setUsers}