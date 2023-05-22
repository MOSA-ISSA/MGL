import {View, Text, Button, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import { Image } from 'react-native-animatable';
import TheHeader from '../../component/TheHeader';
import { ScreenNames } from '../../../Storge/global';

const SignIn =props=>{
    console.log('SignIn');

    //AsyncStorage.clear();
    //const {logged,setlogged} = useContext(TheContext)

    const {User,setUser,image,imageBackground} = useContext(TheContext)
    const [mail, setMail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassward] = useState("");
    const [alertCondition, setAlert] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    //console.log(User.imageBackground);

    const userCondition =()=>{
        if (mail.length==0&&userName.length==0&&password.length==0){
            setAlert('! pleas enter data')
            return(false)
        }
        if (mail.includes(" ")){
            setAlert("mail should not includes spaces\" \"")
            return(false)
        }
        if (!mail.includes("@")){
            setAlert("mail should includes @")
            return(false)
        }
        if (!mail.includes(".com")){
            setAlert("mail should includes .com")
            return(false)
        }
        if(userName.includes(" ")){
            setAlert("user should not includes spaces\" \"")
            return(false)
        }if(userName.length<4){
            setAlert("user length should be at least 4")
            return(false)
        }if(password.length<8){
            setAlert("password length should be at least 8")
            return(false)
        }
        setAlert('')
        return(true)
    }

    const setData = async () => {//set data and log in
    let users = await AsyncStorage.getAllKeys()
        if (!users.includes(userName)) {
            if (userCondition()) {
                //setUser({...User,name: userName,password: password, logged:true})
                User.mail=mail
                User.name=userName
                User.password=password
                User.logged=true
                User.image =image
                User.imageBackground = imageBackground,
                User.list={
                    played:[],
                    planToPlay:[],
                    playing:[],
                    trash:[],
                  }

                AsyncStorage.setItem(User.name, JSON.stringify(User));

                props.navigation.navigate(ScreenNames.Loading)
        
                }if (users.includes(userName)) {
                    setAlert('thare anther user in this name')
                }
        }else{
            setAlert('thare anther user in this name')
        }
    }

    return (
        <View style={{flex:1,backgroundColor:"#0d516a"}}>
            <TheHeader textHeader={'MGL'}/>

            <View style={styles.screenStyle}>

                    <View style={{alignItems:'center',marginBottom:40,}}>
                        <Text style={styles.titleStyle}>sign in</Text>
                    </View>

                    <View style={styles.userNameBox}>
                        <TextInput
                            onChangeText={setMail}
                            value={mail}
                            placeholder="@gmail.com"
                            keyboardType="email-address"
                            style={{fontSize:18}}
                            />
                    </View>
            
                    <View style={styles.userNameBox}>
                        <TextInput
                            onChangeText={setUserName}
                            value={userName}
                            placeholder="userName"
                            keyboardType="default"
                            style={{fontSize:18}}
                            />
                    </View>

                    <View style={styles.passwordBox}>
                        <TextInput
                        onChangeText={setPassward}
                        value={password}
                        placeholder="password"
                        keyboardType="default"
                        secureTextEntry={hidePassword}
                        onSubmitEditing={setData}
                        style={{fontSize:18,flexGrow:1}}
                        />
                        <TouchableOpacity style={styles.showPasswordButton} onPress={()=>setHidePassword(!hidePassword)}>
                            <Image style={{height: '100%',width: "100%",}} source={require('../../asets/images/showPasword.png')}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.alertStyle}>{alertCondition}</Text>

                    <TouchableOpacity style={styles.navLogin} onPress={()=>props.navigation.navigate(ScreenNames.LogIn)}>
                    <Text style={styles.navStyle}>log in...</Text>
                    </TouchableOpacity>
            
                    <View style={{margin: 20}}>
                    <Button title="Sign in" onPress={setData} />
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
    userNameBox:{
        borderWidth:2
        ,margin:10,
        paddingLeft: 10,
        borderColor: '#199',
        borderRadius:10,
        backgroundColor:'#296e62',
    },
    passwordBox:{
        borderWidth:2,
        margin:10,
        marginBottom:20,
        paddingHorizontal: 10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,borderColor:'#199',
        backgroundColor:'#296e62'
    },
    navLogin:{
        paddingHorizontal:20,
        alignItems:'flex-end',
    },
    showPasswordButton:{
        height:25,width:25,
        borderRadius:5,
        borderWidth:0.9,
        borderColor:'#199'
    },

})

export default SignIn