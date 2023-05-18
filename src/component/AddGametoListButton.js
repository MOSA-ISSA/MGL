import React, { useContext, useState } from 'react';
import {View, StyleSheet, Alert,Text} from 'react-native';
import TheContext from '../../Storge/thisContext';
import TheButton from './TheButton';
import TheModal from './TheModal';
import { globalHW } from '../../Storge/global';
import AddDoneAnimation from '../asets/animations/AddDoneAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddGametoListButton = ({item,buttonStyle,buttonNameStyle}) => {

    const {User,setUser,list} = useContext(TheContext)
    const [chekName, setName]= useState("")
    const [modalVisible, setModalVisible]= useState(false)

    

    const AddorRemove={
        handlAddToListButton:(item)=>{
         if (User.logged) {
           //setModalVisible(true)
           let include= (User.list.some((list)=>list.gameName==item.gameName));
           if(!include){
             User.list.push(item)
             AsyncStorage.setItem(User.name, JSON.stringify(User));
             setModalVisible(true)
             console.log('aded');
           }else{
             removefromList(item)
           }
         }else{
           console.log('u shud to log in');
            Alert.alert('you are not logged', 'Do you have an user', [
             {
               text: 'Cancel',
               style: 'cancel',
             },
             {text: 'log in', onPress: () => navigation.navigate('LogIn')},
             {text: 'sign in', onPress: () => navigation.navigate('SignIn')},
           ]);
         }
         setName(item.gameName)
       },
    
        addToListButtonIcon:(item)=>{
    
         if (User.logged) {  
           let include= (User.list.some((list)=>list.gameName==item.gameName));
           if(include){
            //console.log("is in");
            return('-')
           }else{
             
             return('+')
           }
         }else{
           return('+')
         }
     
       }
      }
    
      const removefromList =(item)=>{
       Alert.alert('Do you whant to remove the game from your list', '', [
         {
           text: 'Cancel',
           style: 'cancel',
         },
         {text: 'yes', onPress: () => {
           console.log(item.gameName);
           let gameNameIndex=User.list.findIndex((element) => element.gameName == item.gameName)
           //console.log(gameNameIndex);
           User.list.splice(gameNameIndex,1)
           AsyncStorage.setItem(User.name, JSON.stringify(User));
           console.log('removed');
           setUser({...User})
         }},
       ]);
      }

      const RenderOptionsToAdd=()=>{
        console.log(list);
        const options =['played','planToPlay','playing','trash']
        const include=(Object.values(list).flat().includes(item))

        console.log(list);

        const onPressOptions=(option)=>{
          // console.log(Object.values(list).flat().includes(item));
          
          if (!include) {
            list[option].push(item)
          }
          
        }

        return(
          <>
            
            <Text>Add to :</Text>
            <View style={styles.optionsSt}>
              {options.map((option)=>
                <TheButton 
                key={option} 
                buttonName={option}
                buttonNameStyle={{fontSize:20}}
                buttonStyle={[styles.buttonStyle,
                  {backgroundColor: (list[option].includes(item))?'green':'#454545',}
                  ,]}
                onPress={()=>onPressOptions(option)}
                />
              )}
            </View>
            <TheButton 
                buttonName={'Cancle'}
                buttonNameStyle={{fontSize:20}}
                buttonStyle={styles.Canclebutton}
                onPress={()=>setModalVisible(false)}
                />
          </>
        )
      }

    return (
        <>
            <TheButton buttonNameStyle={buttonNameStyle} 
            buttonName={AddorRemove.addToListButtonIcon(item)} 
            buttonStyle={buttonStyle}
            onPress={()=>AddorRemove.handlAddToListButton(item)}
            />
            <TheModal setModalVisible={chekName==item.gameName&&modalVisible} animationType={'fade'}>
                <View style={styles.centerFoAddingAnimation}>
                    <View style={styles.AddDoneAnimation}>
                        <AddDoneAnimation setModalVisible={(value)=>[setName(value),setModalVisible(value)]}/>
                    </View>
                </View>
            </TheModal>
            {/* <TheModal setModalVisible={chekName==item.gameName&&modalVisible} animationType={'fade'}>
                <View style={styles.centerFoAddingAnimation}>
                    <View style={styles.wharetoAdd}>
                        <RenderOptionsToAdd/>
                    </View>
                </View>
            </TheModal> */}
        </>
    );
}

const styles = StyleSheet.create({
    centerFoAddingAnimation:{
        flex:1, 
        justifyContent:'center',alignItems: 'center',
    },
    AddDoneAnimation:{
        height:(globalHW.windowWidth*0.5),width:(globalHW.windowWidth*0.5), 
        backgroundColor:"#0d697a",borderRadius:100,
        borderColor:'black',borderWidth:2,elevation:5
    },
    wharetoAdd:{
      // height:(globalHW.windowWidth*0.5),width:(globalHW.windowWidth*0.5),
      backgroundColor:"#0d697a",borderRadius:10,
      borderColor:'black',borderWidth:2,elevation:5,
      padding:10,
      
  },
  optionsSt:{
    flexDirection: 'row',
    // justifyContent:'space-between'
  },
  buttonStyle:{
    margin:5,
    padding:5,
    backgroundColor:'#454545',
    borderRadius:10
  },
  Canclebutton:{
    margin:5,
    padding:5,
    backgroundColor:'#65000b',
    borderRadius:10
  }
  

})

export default AddGametoListButton;
