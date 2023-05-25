import React, {useContext,useEffect,useState} from 'react';
import {View,} from 'react-native';
import TheContext from '../../../Storge/thisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheHeader from '../../component/TheHeader';
import { ScreenNames } from '../../../Storge/global';
import LogSignInComponent from '../../component/logSignInComponent/logSignInComponent';


const LogIn =props=>{
    console.log('LogIn');
    //AsyncStorage.clear();

    //I shoud Add log in with mail

    const {User,} = useContext(TheContext)
    const [alertCondition, setAlert] = useState("");
    const [foegetPassword, setForget] = useState(0);
    const [user,setUser]=useState({
        userName:['',false],
        password:['',false],
    })
    const [users, setUsers] = useState(false);

    console.log(user.userName[0]);


    useEffect(() => {
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
        restorUsers()
        // console.log(users);
    }, []);

    // const checkData = async ()=>{
    //     let users = await AsyncStorage.getAllKeys()
    //     console.log(users);
    // }
    // checkData()

    // useEffect(() => {
    //     console.log("--useEffect in LogIn--");
    
    //     const backAction = () => {
    //       Alert.alert('Hold on!', 'Are you sure you want exitApp?', [
    //         {
    //           text: 'Cancel',
    //           onPress: () => null,
    //           style: 'cancel',
    //         },
    //         {text: 'YES', onPress: () => BackHandler.exitApp()},
    //       ]);
    //       return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //       'hardwareBackPress',
    //       backAction,
    //     );               
    //   },[]);//to not go back will change whin add the login to the project

    const handilingLogin=async ()=>{
        if ((users.includes(user.userName[0]))) {
            //console.log("user name faund");
            let getedUser = await AsyncStorage.getItem(user.userName[0]);
            getedUser = JSON.parse(getedUser);
            if (getedUser.password==user.password[0]) {
                User.name=user.userName[0]
                User.password=user.password[0]
                User.logged=true
                User. mail = getedUser.mail
                User.image = getedUser.image
                User.imageBackground = getedUser.imageBackground
                User.list=getedUser.list
                
                AsyncStorage.setItem(User.name, JSON.stringify(User));
                setAlert("")
                props.navigation.navigate(ScreenNames.Loading)
            }else{
                setForget(foegetPassword+1)
                if (user.password[0].length>7) {
                    setAlert("password is not true")
                }else{
                    setAlert("password length should be at least 8")
                }
                if(foegetPassword>5){
                    setAlert(getedUser.password)
                }
            }
        }else{
            if(user.userName[0].includes(" ")){
                setAlert("user should not includes spaces\" \"")
            }if(user.userName[0].length<4){
                setAlert("user length should be at least 4")
            }
            else{
            setAlert("user name not faund")
            }
        }
    }

    const handilingfoegetPassword=()=>{
        setForget(0)
        setAlert("your password ********  :)")
    }

    return(
        <View style={{flex:1,backgroundColor:"#0d516a"}}>
            <TheHeader textHeader={'MGL'}/>

            <LogSignInComponent
                titleName={'Log In'}
                alertCondition={alertCondition}
                LogSignInButton={handilingLogin}
                user={user}
                foegetPassword={foegetPassword}
                handilingfoegetPassword={handilingfoegetPassword}
                users={users}
            />

        </View>
    )
}

export default LogIn