import {View,} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import { ScreenNames,} from '../../../Storge/global';
import LogSignInComponent from '../../component/logSignInComponent/logSignInComponent';
import { mailCondition, passwordCondition, userIDCondition, userNameCondition,} from '../../userCoditions';
import { creatNewUser, creatUser, isUserExist } from '../../res/API';
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
    const [canCreatUser, setCanCreatUser] = useState(false);

    const canCreat =()=>isUserExist({"ID":user.userID.text}).then((res)=>{
        console.log(!res.message);
        setCanCreatUser(!res.message)
        return !res.message
    })
    const handelcanCreat=()=>{
        canCreat().then((res)=>{
            if(!res){
                user.userID.validation=false
                setAlert('Another user with this ID already exists')
            }
        })
    }
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
        // console.log("change");
        handelcanCreat()
        restorUsers()
        return
    }, [user.userID.text]);
        
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
            User.ID=user.userName.text
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
                ID: user.userID.text,
                mail: user.mail.text,
                password:user.userPassword.text,
                name:user.userName.text,
                image :image,
                imageBackground : imageBackground,
            }
            creatNewUser(JSON.stringify(creatUser))
            .then((res) => {

                if (res.message==="User Exist") {
                    user.userID.validation=false
                    setAlert('Another user with this ID already exists')
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