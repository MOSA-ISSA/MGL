import { useNavigation } from '@react-navigation/native';
import React,{useContext,useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert, FlatList} from 'react-native';
import GamesCard from '../shared/GamesCard';
import TheButton from './TheButton';
import TheModal from './TheModal';
import AddDoneAnimation from '../asets/animations/AddDoneAnimation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../Storge/thisContext';
import { globalHW } from '../../Storge/global';

const RenderGameCard = ({games}) => {
    // console.log('RenderGameCard');
    //console.log(globalHW.windowHeight);

    const navigation = useNavigation();
    const {User,setUser,} = useContext(TheContext)
    const [chekName, setName]= useState("")
    const [modalVisible, setModalVisible]= useState(false)


    const AddToList={
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

    const RenderItem = ({item}) => (    
          <GamesCard item={item} onPress={() => navigation.navigate('GameDetails', {item})}>
            <TheButton buttonName={AddToList.addToListButtonIcon(item)} buttonStyle={styles.AddOrRemoveButton}
              buttonNameStyle={{fontSize: 15,}}
              onPress={()=>AddToList.handlAddToListButton(item)} />     
            <TheModal setModalVisible={chekName==item.gameName&&modalVisible} animationType={'fade'}>
                <View style={styles.center}>
                  <View style={styles.AddDoneAnimation}>
                    <AddDoneAnimation setModalVisible={(value)=>[setName(value),setModalVisible(value)]}/>
                  </View>
                </View>
            </TheModal>
          </GamesCard>
    )

    return (
      <View style={{alignItems:'center'}}>
        <FlatList
          data={games}
          numColumns={3}
          keyExtractor={(item) => item.key}
          renderItem={({item})=>(
          <RenderItem item={item}/>
          )}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    AddOrRemoveButton:{
        height: 20,width: 20,
        backgroundColor: '#199',
        borderRadius:20
    },
    center:{ 
        flex:1, 
        justifyContent:'center',
        alignItems: 'center',
    },
    AddDoneAnimation:{
        height:(globalHW.windowWidth*0.5),
        width:(globalHW.windowWidth*0.5), 
        backgroundColor:"#0d697a",
        borderRadius:100,
        borderColor:'black',
        borderWidth:2,
        elevation:5
      },

})

export default RenderGameCard;
