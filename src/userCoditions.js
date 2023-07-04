import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
    
    export const mailCondition=(user,onErr)=>{
        if (user?.mail) {
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(user.mail.text) === false) {
                // console.log("Email is Not Correct");
                onErr?onErr('Email is Not Correct'):null
                user.mail.validation==false
                return false;
            }else {
                // console.log("Email is Correct");
                return true
            }
            }
        return false
    }
    
    export const userIDCondition=(user,users,onErr,)=>{
        if (user?.userID) {
            if (user.userID['text'].length !== 0) {
                if (!user.userID['text'].includes(' ')) {
                    if (user.userID['text'].length > 3) {
                        if(!users.includes(user.userID['text'])){
                        // onErr('')
                        return true
                        }else{onErr?onErr('Another user with this ID already exists'):null} 
                    }else{onErr?onErr('userID length should be at least 4'):null} 
                }else{onErr?onErr('userID should not include spaces'):null} 
            }else{onErr?onErr('Please enter userID'):null}
            user.userID['validation']=false
        }
        return false
    }

    export const userNameCondition=(user,users,onErr,)=>{
        if (user?.userName) {
            if (user.userName['text'].length !== 0) {
                return true
            }else{onErr?onErr('Please enter userName'):null}
        }else{
            false
        }
    }
  
    export const passwordCondition=(user,onErr)=>{
      if (user?.userPassword) {
          if (user.userPassword['text'].password !== 0) {
              if (user.userPassword['text'].length > 7) {
                    onErr?onErr(''):null
                  return true
              }else{onErr?onErr('Password length should be at least 8'):null} 
          }else{onErr?onErr('Please enter password'):null} 
          user.userPassword['validation']=false
      }
      return false
    }
    
    
    
    
    
    
    
// export const mailCondition=(user,onErr)=>{
//     if (user?.mail) {
//         let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//         if (reg.test(user.mail.text) === false) {
//             console.log("Email is Not Correct");
//             // this.setState({ email: text })
//             onErr?onErr('Email is Not Correct'):null
//             user.mailvalidation==false
//             return false;
//         }else {
//             // this.setState({ email: text })
//             console.log("Email is Correct");
//             return true
//           }
//         // if (user.mail?.[0]?.length !== 0) {
//         //     if (!user.mail[0].includes(' ')) {
//         //         if (user.mail[0]?.includes('@')) {
//         //             if (user.mail[0]?.includes('.com')) {
//         //             //   onErr('')
//         //                 return true
//         //             }else{onErr?onErr('Mail should include .com'):null}
//         //         }else{onErr?onErr('Mail should include @'):null} 
//         //     }else{onErr?onErr('Mail should not include spaces'):null} 
//         // }else{onErr?onErr('Please enter Mail'):null} 
//         // user.mail[1]= false
//         }
//     return false
// }
