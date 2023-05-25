import React from 'react';
import {View, StyleSheet,} from 'react-native';
import Title from './Title';
import UserInput from './UserInput';
import AlertForLogSignIn from './AlertForLogSignIn';
import NavigateButton from './NavigateButton';
import PasswordFoeget from './PasswordFoeget';
import OnDoneEditing from './OnDoneEditing';
import {mailCondition, passwordCondition, userNameCondition } from '../../userCoditions';


const LogSignInComponent = (
    {
        titleName,
        alertCondition,
        LogSignInButton,
        user,
        foegetPassword,
        handilingfoegetPassword,
        users,
    }) => {
        
        const userCondition = (type) => {
            // console.log(type);
            type=='mail'?user.mail[1]=mailCondition(user):null
            type=='userName'?user.userName[1]=userNameCondition(user,users):null
            type=='password'?user.password[1]=passwordCondition(user):null
        }
        // console.log(user);

    const RenderInputText=()=>{
        const inputsParams=[
            titleName=='Sign In'?{
                keyboardType:"email-address",
                placeholder:"email-address",
                type:'mail',
                value:user.mail[0],
            }:null,
            {
                keyboardType:"default",
                placeholder:"userName",
                type:'userName',
                value:user.userName[0],
            },
            {
                keyboardType:"default",
                placeholder:"password",
                type:'password',
                value:user.password[0],
            },
        ]
        return(
            inputsParams.map((params,i)=>
                params?<UserInput 
                    key={titleName+i}
                    user={user} 
                    UserCondition={userCondition} 
                    disabledConditionBox={titleName=='Log In'} 
                    {...params}/>:null
            )
        )
    }

    const LogSign=[
        {
            ID:'title',
            Show:()=> titleName?<Title titleName={titleName}/>:null
        },
        {
            ID:'RenderInputText',
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
