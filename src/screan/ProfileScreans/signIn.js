import {View,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import { ScreenNames,} from '../../../Storge/global';
import LogSignInComponent from '../../component/logSignInComponent/logSignInComponent';
import { mailCondition, passwordCondition, userIDCondition, userNameCondition,} from '../../userCoditions';
import { creatNewUser, creatUser } from '../../res/API';
// import { UserCondition } from '../../userCoditions';

const SignIn =props=>{
    console.log('SignIn');
    //AsyncStorage.clear();

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

    //users.includes(user.userName[0])
      

    // const userCondition = () => {
    //     if (user.mail[0].length === 0 && user.userName[0].length === 0 && user.password[0].length === 0) {
    //         setAlert('Please enter data');
    //         return false;
    //     }

    //     if (user.mail[0].includes(' ')) {
    //         setAlert('Mail should not include spaces');
    //         return false;
    //     }
        
    //     if (!user.mail[0].includes('@')) {
    //         setAlert('Mail should include @');
    //         return false;
    //     }
        
    //     if (!user.mail[0].includes('.com')) {
    //         setAlert('Mail should include .com');
    //         return false;
    //     }
        
    //     if (user.userName[0].includes(' ')) {
    //         setAlert('Username should not include spaces');
    //         return false;
    //     }
        
    //     if (user.userName[0].length < 4) {
    //         setAlert('Username length should be at least 4');
    //         return false;
    //     }
        
    //     if (user.password[0].length < 8) {
    //         setAlert('Password length should be at least 8');
    //         return false;
    //     }
        
    //     setAlert('');
    //     return true;
    // };
    
    const userCondition = ()=>{
        user.userID.validation?user.userPassword.validation=passwordCondition(user,setAlert):null
        user.userName.validation?user.userID.validation=userIDCondition(user,users,setAlert,):null
        user.mail.validation?user.userID.validation=userNameCondition(user,users,setAlert,):null
        !user.mail.validation?user.mail.validation=mailCondition(user,setAlert):null
        return user.userID.validation&&user.mail.validation&&user.userPassword.validation
    }

    const signIn = () => {//set data and log in     
        if (userCondition()) {
            User.mail=user.mail.text
            User.name=user.userID.text
            User.password=user.userPassword.text
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
    }

    const signUp =()=>{
        if (userCondition()) {
            // console.log(user);
            let creatUser={
                ID: user.userID.text,//m@m.mm
                mail: user.mail.text,//m
                password:user.userPassword.text,//mosa
                name:user.userName.text,//123123123
            }
            creatNewUser(JSON.stringify(creatUser))
            .then((res) => {

                if (res.message==="User Exist") {
                    setAlert(res.message)
                }else{
                    signIn()
                }
                // console.log(res);
            })
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"#0d516a"}}>
            <TheHeader textHeader={'MGL'}/>

            <LogSignInComponent
                titleName={'Sign In'}
                alertCondition={alertCondition}
                LogSignInButton={signUp}
                user={user}
                users={users}
            />
             {/* <LogSignInComponent
                titleName={'Log In'}
                alertCondition={alertCondition}
                user={user}
            /> */}
          
        </View>
    )
}

export default SignIn