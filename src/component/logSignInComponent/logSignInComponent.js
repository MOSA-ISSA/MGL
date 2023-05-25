import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Title from './Title';
import UserInput from './UserInput';
import AlertForLogSignIn from './AlertForLogSignIn';
import NavigateButton from './NavigateButton';
import PasswordFoeget from './PasswordFoeget';
import OnDoneEditing from './OnDoneEditing';
import { UserCondition, mailCondition, passwordCondition, userNameCondition } from '../../userCoditions';


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

        // console.log(user?.mail?.[0]?.length)

        // const mailCondition=()=>{
        //     if (user?.mail) {
        //         if (user.mail?.[0]?.length !== 0) {
        //             if (!user.mail[0].includes(' ')) {
        //                 if (user.mail[0]?.includes('@')) {
        //                     if (user.mail[0]?.includes('.com')) {
        //                         return true
        //                     } 
        //                 } 
        //             } 
        //         } 
        //         user.mail[1]= false
        //     }
        //     return false
        // }

        // const userNameCondition=()=>{
        //     console.log('1');
        //     if (user?.userName) {
        //         console.log('2');
        //         if (user.userName?.[0]?.length !== 0) {
        //             console.log('3');
        //             if (!user.userName[0].includes(' ')) {
        //                 console.log('4');
        //                 if (user.userName[0].length > 3) {
        //                     console.log('5');
        //                     return true
        //                 }    
        //             } 
        //         } 
        //         user.userName[1]=false
        //     }
        //     // return false
        // }

        // const passwordCondition=()=>{
        //     if (user?.password) {
        //         if (user.password?.[0]?.password !== 0) {
        //             if (user.password[0].length > 7) {
        //                 return true
        //             }
        //         } 
        //         user.password[1]=false
        //     }
        //     return false
        // }
        
        const userCondition = (type) => {
            // console.log(type);
            type=='mail'?user.mail[1]=mailCondition(user):null
            type=='userName'?user.userName[1]=userNameCondition(user,users):null
            type=='password'?user.password[1]=passwordCondition(user):null
        }
        // console.log(user);

    const RenderInputText=()=>{
        const inputsParams=[
            user?.mail?.[0]!=undefined?
            {
                keyboardType:"@gmail.com",
                placeholder:"email-address",
                type:'mail',
                value:user.mail[0],
            }:null,
            user.userName[0]!=undefined?
            {
                keyboardType:"default",
                placeholder:"userName",
                type:'userName',
                value:user.userName[0],
            }:null,
            user.password[0]!=undefined?
            {
                keyboardType:"default",
                placeholder:"password",
                type:'password',
                value:user.password[0],
            }:null,
        ]
        return(
            // <FlatList
            //     data={inputsParams}
            //     renderItem={({ item }) => item ? <UserInput key={item.type} user={user} {...item} /> : null}
            //     style={{ flex: 1 }}
            //     contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }} // Align content to the bottom
            // />
            inputsParams.map((params,i)=>
                params?<UserInput key={i} user={user} UserCondition={userCondition} disabledConditionBox={titleName=='Log In'} {...params}/>:null
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
