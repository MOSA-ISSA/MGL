import React, {useContext } from 'react';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import TheHeader from '../../component/TheHeader';
import {CommonActions,useNavigation} from '@react-navigation/native';
import UserScreenInfoInput from '../../component/UserScreenComponent/UserScreenInfoInput';
import { ScreenNames } from '../../../Storge/global';
import TheButton from '../../component/TheButton';
import UserScreenFace from '../../component/UserScreenComponent/UserScreenFace';
import { deleteUserByID } from '../../res/API';

const UserScreen = props => {
  
  console.log("UserScreen");
  
  const navigation = useNavigation();
  const {User,image,imageBackground} = useContext(TheContext)

  console.log(User);

  const logout = async ()=>{
      User.logged= false,
      AsyncStorage.setItem(User.ID, JSON.stringify(User));
      User.name= '',
      User.password= '',
      User.mail = '',
      User.image = image,
      User.imageBackground = imageBackground,
      User.list={
        played:[],
        planToPlay:[],
        playing:[],
        trash:[],
      }
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ScreenNames.Loading }]
        })
      )
  }

  const deleteAcaunt=()=>{
    AsyncStorage.removeItem(User.ID);
    deleteUserByID({"ID":User.ID})
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ScreenNames.Loading }]
      })
    )
  }

  const RenderInfoInput =()=>{
    const params ={
      mail:
      {
        keyboardType:"email-address",
        placeholder:"mail",
        type:'mail',
        value:User.mail,
      },
      userID:
      {
        keyboardType:"default",
        placeholder:"userID",
        type:'ID',
        value:User.ID,
      },
      userName:
      {
        keyboardType:"default",
        placeholder:"userName",
        type:'name',
        value:User.name,
      },
      userPassword:
      {
        keyboardType:"default",
        placeholder:"password",
        type:'password',
        value:User.password,
      }
    }
    const inputsParams =[params.userID,params.userName,params.mail,params.userPassword]
    return(
      inputsParams.map((params)=>
          params?<UserScreenInfoInput
            key={params.type} {...params}/>:null
        )
      )
  }

  const RenderInfoButton=()=>{
    const buttons=[
      {
        name:'my list',
        onPress:()=>props.navigation.navigate('MyList'),
        st:styles.logout
      },
      {
        name:'log out',
        onPress:()=>logout(),
        st:styles.logout
      },
      {
        name:'delete acaunt',
        onPress:()=>deleteAcaunt(),
        st:styles.deleteAcaunt
      },
    ]
    return(
      <View style={styles.ButtonView} >
        {buttons.map((button)=>
          <TheButton
            key={button.name}
            buttonName={button.name}
            buttonNameStyle={styles.subTitle}
            buttonStyle={button.st}
            onPress={button.onPress}
          />
        )}
      </View>
    )
  }

  {/*/////////////////// View ///////////////////*/}
  return (
    <ScrollView style={styles.screenView}>
      <TheHeader textHeader={'MGL'}/>

      <UserScreenFace/>

      <View style={styles.infoView}> 
        <Text style={styles.subTitle}>Info:</Text>
        <RenderInfoInput/>
        <RenderInfoButton/>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({

  screenView:{flex:1, backgroundColor: '#12171f',},
  infoView:{flex:1,padding:10},
  
  subTitle:{fontSize:24,fontWeight:'600', color:'#35c6d7'},

  /* Button st*/
  ButtonView:{flex: 1,alignItems:'center',justifyContent:'center',borderRadius:10},
  logout:{height:50,width:'40%',backgroundColor:'#235687',alignItems:'center',justifyContent:'center',borderRadius:10,margin:10},
  deleteAcaunt:{height:50,width:'40%',backgroundColor:'#772339',alignItems:'center',justifyContent:'center',borderRadius:10,margin:10}
})

export default UserScreen;