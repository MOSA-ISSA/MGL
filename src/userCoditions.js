import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
    
export const mailCondition=(user,onErr)=>{
    if (user?.mail) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(user.mail[0]) === false) {
            console.log("Email is Not Correct");
            // this.setState({ email: text })
            onErr?onErr('Email is Not Correct'):null
            user.mail[1]==false
            return false;
        }else {
            // this.setState({ email: text })
            console.log("Email is Correct");
            return true
          }
        // if (user.mail?.[0]?.length !== 0) {
        //     if (!user.mail[0].includes(' ')) {
        //         if (user.mail[0]?.includes('@')) {
        //             if (user.mail[0]?.includes('.com')) {
        //             //   onErr('')
        //                 return true
        //             }else{onErr?onErr('Mail should include .com'):null}
        //         }else{onErr?onErr('Mail should include @'):null} 
        //     }else{onErr?onErr('Mail should not include spaces'):null} 
        // }else{onErr?onErr('Please enter Mail'):null} 
        // user.mail[1]= false
        }
        console.log('niga');
    return false
}

// const validate = (text) => {
//     console.log(text);
//     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
//     if (reg.test(text) === false) {
//       console.log("Email is Not Correct");
//       this.setState({ email: text })
//       return false;
//     }
//     else {
//       this.setState({ email: text })
//       console.log("Email is Correct");
//     }
//   }



  
    export const userNameCondition=(user,users,onErr,)=>{
      if (user?.userName) {
          if (user.userName?.[0]?.length !== 0) {
              if (!user.userName[0].includes(' ')) {
                  if (user.userName[0].length > 3) {
                      if(!users.includes(user.userName[0])){
                        // onErr('')
                        return true
                      }else{onErr?onErr('Another user with this name already exists'):null} 
                  }else{onErr?onErr('Username length should be at least 4'):null} 
              }else{onErr?onErr('Username should not include spaces'):null} 
          }else{onErr?onErr('Please enter userName'):null}
          user.userName[1]=false 
      }
      return false
    }
  
    export const passwordCondition=(user,onErr)=>{
      if (user?.password) {
          if (user.password?.[0]?.password !== 0) {
              if (user.password[0].length > 7) {
                    onErr?onErr(''):null
                  return true
              }else{onErr?onErr('Password length should be at least 8'):null} 
          }else{onErr?onErr('Please enter password'):null} 
          user.password[1]=false
      }
      return false
    }