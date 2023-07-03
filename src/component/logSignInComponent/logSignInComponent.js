import React from 'react';
import {View, StyleSheet,} from 'react-native';
import Title from './Title';
import UserInput from './UserInput';
import AlertForLogSignIn from './AlertForLogSignIn';
import NavigateButton from './NavigateButton';
import PasswordFoeget from './PasswordFoeget';
import OnDoneEditing from './OnDoneEditing';
import {mailCondition, passwordCondition, userIDCondition, userNameCondition } from '../../userCoditions';


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

        // console.log(user);
        
    const userCondition = (type) => {
        type=='mail'?user.mail.validation=mailCondition(user):null
        type=='userName'?user.userName.validation=userNameCondition(user,users):null
        type=='userID'?user.userID.validation=userIDCondition(user,users):null
        type=='userPassword'?user.userPassword.validation=passwordCondition(user):null
    }

    const params={
         mailParams: 
         titleName=='Sign In'?{
            keyboardType:"email-address",
            placeholder:"mail",
            type:'mail',
            value:user.mail.text,
        }:null,
        userNameParams: 
        titleName=='Sign In'?
        {
            keyboardType:"default",
            placeholder:"userName",
            type:'userName',
            value:user.userName.text,
       }:null,
       userIDParams: 
        {
            keyboardType:"default",
            placeholder:"userID",
            type:'userID',
            value:user.userID.text,
       },
       userPasswordParams: 
       {
            keyboardType:"default",
            placeholder:"password",
            type:'userPassword',
            value:user.userPassword.text,
      },
    }

    const RenderInputText=()=>{
        const inputsParams=[
            params.mailParams,
            params.userNameParams,
            params.userIDParams,
            params.userPasswordParams,
        ]
        return(
            inputsParams.map((params,i)=>
                params?<UserInput 
                    key={titleName+i}
                    user={user} 
                    UserCondition={userCondition} 
                    disabledConditionBox={titleName=='Log In'} 
                    {...params}
                />:null
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
