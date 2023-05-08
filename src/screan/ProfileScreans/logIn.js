import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text,TouchableOpacity, TextInput, Button,BackHandler, Alert, Image,} from 'react-native';
import TheContext from '../../../Storge/thisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheHeader from '../../component/TheHeader';
import { ScreenNames } from '../../../Storge/global';


const LogIn =props=>{
    console.log('LogIn');
    //AsyncStorage.clear();

    const {User,setUser} = useContext(TheContext)
    const [userName, setUserName] = useState("");
    const [password, setPassward] = useState("");
    const [alertCondition, setAlert] = useState("");
    const [foegetPassword, setForget] = useState(0);
    const [hidePassword, setHidePassword] = useState(true);

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
        let users = await AsyncStorage.getAllKeys()
        console.log(users);
        if ((users.includes(userName))) {
            //console.log("user name faund");

            let user = await AsyncStorage.getItem(userName);
            user = JSON.parse(user);
            //console.log(user.password);
            if (user.password==password) {
                //setUser({...user, logged:true})
                User.name=userName
                User.password=password
                User.logged=true
                User. mail = user.mail
                User.image = user.image
                User.imageBackground = user.imageBackground
                User.list=user.list
                
                AsyncStorage.setItem(User.name, JSON.stringify(User));
                setAlert("")
                //React.useCallback()
                props.navigation.navigate(ScreenNames.Loading)
            }else{
                setForget(foegetPassword+1)
                //console.log(foegetPassword);
                setAlert("password is not true")
                if(foegetPassword>5){
                    setAlert(user.password)
                }
            }
        }else{
            if(userName.includes(" ")){
                setAlert("user should not includes spaces\" \"")
            }if(userName.length<4){
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
            {/* <Header title={"MGL"}/> */}

            <View style={styles.screenStyle}>

                <View style={styles.titleView}>
                    <Text style={styles.titleStyle}>Log in</Text>
                </View>

                {/* userNameBox */}
                <View style={styles.userNameBox}>
                    <TextInput
                        onChangeText={setUserName}
                        value={userName}
                        placeholder="userName"
                        style={{fontSize:18,}}
                        />
                </View>
                {/* passwordBox */}
                <View style={styles.passwordBox}>
                    <TextInput
                    onChangeText={setPassward}
                    value={password}
                    placeholder="password"
                    keyboardType="default"
                    secureTextEntry={hidePassword}
                    style={{fontSize:18,flexGrow:1}}
                    onEndEditing={handilingLogin}
                    />
                    <TouchableOpacity style={styles.showPasswordButton} onPress={()=>setHidePassword(!hidePassword)}>
                        <Image style={{height: '100%',width: "100%",}} source={require('../../asets/images/showPasword.png')}/>
                    </TouchableOpacity>
                </View>
                {/* alertCondition */}
                <Text style={styles.alertStyle}>{alertCondition}</Text>
                {/* navigate SignIn */}
                <TouchableOpacity onPress={()=>props.navigation.navigate(ScreenNames.SignIn)}>
                    <Text style={styles.navStyle}>Sign in...</Text>
                </TouchableOpacity>
                {/* foegetPassword */}
                <TouchableOpacity onPress={handilingfoegetPassword} disabled={foegetPassword<4}>
                    <Text style={styles.foegetPasswordStyle}>{foegetPassword>3?"foeget Password...":""}</Text>
                </TouchableOpacity>
                {/* Log in Button */}
                <View style={{margin: 20}}>
                    <Button title="Log in" onPress={handilingLogin} />
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyle:{
        flex:1,
        backgroundColor:"#12171f",
        justifyContent:'space-around',
    },
    titleStyle:{
        fontSize: 30,
        fontWeight:'600',
        color:'#00bfff'
    },
    alertStyle:{
        fontSize: 20,
         marginLeft:20,
          color:'#c41e3a'
    },
    navStyle:{
        fontSize: 15,
        marginLeft:20,
        color:'#1e90ff',
    },
    foegetPasswordStyle:{
        fontSize: 15,
         marginLeft:20,
          color:'skyblue'
    },
    titleView:{
        alignItems:'center',
        marginBottom:40,
    },
    userNameBox:{
        borderWidth:2
        ,margin:10,
        paddingLeft: 10,
        borderColor: '#199',
        borderRadius:10,
        backgroundColor:'#296e62'
    },
    passwordBox:{
        borderWidth:2
        ,margin:10,
        paddingHorizontal: 10,
         flexDirection:'row' ,
         alignItems:'center',
         justifyContent:'space-between',
         borderRadius:10,borderColor: '#199',
         backgroundColor:'#296e62'
    },
    showPasswordButton:{
        height:25,width:25,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'#199'
    },


})

export default LogIn