import React from 'react';
import {View, StyleSheet,} from 'react-native';
import Title from './Title';
import UserInput from './UserInput';
import AlertForLogSignIn from './AlertForLogSignIn';
import NavigateButton from './NavigateButton';
import PasswordFoeget from './PasswordFoeget';
import OnDoneEditing from './OnDoneEditing';

const LogSignInComponent = (
    {
        titleName,
        alertCondition,
        LogSignInButton,
        user,
        foegetPassword,
        handilingfoegetPassword,
    }) => {

    const RenderInputText=()=>{
        const inputsParams=[
            user.mail!=undefined?
            {
                keyboardType:"@gmail.com",
                placeholder:"email-address",
                type:'mail',
                value:user.mail,
            }:null,
            user.userName!=undefined?
            {
                keyboardType:"default",
                placeholder:"userName",
                type:'userName',
                value:user.userName,
            }:null,
            user.password!=undefined?
            {
                keyboardType:"default",
                placeholder:"password",
                type:'password',
                value:user.password,
            }:null,
        ]
        return(
            inputsParams.map((params,i)=>
                params?<UserInput key={i} user={user} {...params}/>:null
            )
        )
    }

    const LogSign=[
        {
            ID:'title',
            Show:()=> titleName?<Title titleName={titleName}/>:null
        },
        {
            ID:'mail',
            Show:()=>user!=undefined?<RenderInputText/>:null
        },
        {
            ID:'alert',
            Show:()=> <AlertForLogSignIn alertCondition={alertCondition}/>
        },
        {
            ID:'Navigate',
            Show:()=> <NavigateButton titleName={titleName}/>
        },
        {
            ID:'foeget',
            Show:()=> <PasswordFoeget foegetPassword={foegetPassword} handilingfoegetPassword={handilingfoegetPassword}/>
        },
        {
            ID:'done',
            Show:()=> <OnDoneEditing titleName={titleName} LogSignInButton={LogSignInButton}/>
        },

    ]

    return (
        <View style={styles.screenStyle}>
            {LogSign.map((itme,i)=>[
                <itme.Show key={i}/>,]
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screenStyle:{
        flex:1,
        backgroundColor:"#12171f",
        justifyContent:'space-around',
    },
})

export default LogSignInComponent;
