import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, BackHandler, Alert,ImageBackground,Image,Pressable,FlatList, StyleSheet, TouchableOpacity, ScrollView, SectionList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import User from './data';
import TheContext from '../../../Storge/thisContext';
import ShowImg from './modalForUserScrean.js/ShowImg';
import ImagePicker from 'react-native-image-crop-picker';
import { TextInput } from 'react-native-gesture-handler';
import TheHeader from '../../component/TheHeader';

const UserScreen = props => {
  
  console.log("UserScreen");

  // const handleBackButton=()=> {
  //   console.log("4545454545");
  //   props.navigation.navigate('a')
  //   //BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  //   return (false)
  // }

  //BackHandler.addEventListener('hardwareBackPress',handleBackButton)
  
  
  const {User,setU,image,imageBackground} = useContext(TheContext)
  const [onPressUserImg, setOnPressUserImg] = useState(false);
  const [onPressUserBacImg, setOnPressUserBacImg] = useState(false);
  const [render, setrender] = useState(true)
  const [edit, setedit] = useState(false)
  const [changingText, setChangedText] = useState("");

  const userInfo=[
    {infoType:"name",text:User.name,index:0},
    {infoType:"mail", text:User.mail,index:1},
    {infoType:"password", text:User.password,index:2}
  ]// =>atomtic

  const [editInfo,seteditInfo]=useState([
    {isEdit:false,},
    {isEdit:false,},
    {isEdit:false,}
  ])// =>atomtic

  // useEffect(() => {//to not go back will change whin add the login to the project

  //     console.log("--useEffect work--");

  //     const backAction = () => {
  //       Alert.alert('Hold on!', 'Are you sure you want exitApp?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);
  //       return true;
  //     };

  //     const backHandler = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       backAction,
  //     );
      
  //     return () =>backHandler.remove();
                    
                  
  //   },[]);

  const Alerts={
    alertForchoseImg: (TypImg)=>//alert to start choseImg
    Alert.alert('do you whant to change image', '!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>{Edit.choseImg(TypImg)}},
    ]),
    alertchangingName: (index)=>//alert to start choseImg
    Alert.alert('changing name will cuse loging out', '!', [
      {
        text: 'Cancel', onPress: () =>{Edit.endEdit(index)},
      },
      {text: 'OK',},
    ]),
    alertNameIncludes: (index)=>//alert to start choseImg
    Alert.alert('thare anther user in this userName', '!', [
      {
        text: 'ok',
      },
    ]),
    alertSaveChanges: (oldImg,TypImg) =>// alert whin u change to save changes using the UplodChanges()=>
    Alert.alert('Save changes', '!', [
      {
        text: 'Cancel',
        onPress: () => { if (TypImg=='image') {
                      [User.image=oldImg,setOnPressUserImg(true)]}
                  else{[User.imageBackground=oldImg,setOnPressUserBacImg(true)]}},
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>{ if (TypImg=='image') {
            [setOnPressUserImg(true),UplodChanges()]}
        else{[setOnPressUserBacImg(true),UplodChanges()]}
      }},
    ]),
  }

  const Edit ={
    startEdit: (index,infoType)=>{
      if (infoType=='name') {Alerts.alertchangingName(index)}
      //console.log(index);
      setedit(true)
      if (index==0) {
        seteditInfo(
          [
            {isEdit:true,},
            {isEdit:false,},
            {isEdit:false,}
          ]
        )
      }
      if (index==1) {
        seteditInfo(
          [
            {isEdit:false,},
            {isEdit:true,},
            {isEdit:false,}
          ]
        )
      }
      if (index==2) {
        seteditInfo(
          [
            {isEdit:false,},
            {isEdit:false,},
            {isEdit:true,}
          ]
        )
      }
    },
    endEdit: (index,infoType)=>{
      
      if (UserCondition(infoType)) {
        if (infoType=='name') {
        ChangingUserNameAndChangingTheKey(changingText)
        setChangedText("")
        setedit(false)
        if (index==0) {
          seteditInfo(
            [
              {isEdit:false,},
              {isEdit:false,},
              {isEdit:false,}
            ]
          )
        }
        return
      }
        User[infoType]=changingText
        UplodChanges()}
      //User.password=changingText
      setChangedText("")
      //console.log(info);
      setedit(false)
      //User[info]=changingText
      //UplodChanges()
      if (index==0) {
        seteditInfo(
          [
            {isEdit:false,},
            {isEdit:false,},
            {isEdit:false,}
          ]
        )
      }
      if (index==1) {
        seteditInfo(
          [
            {isEdit:false,},
            {isEdit:false,},
            {isEdit:false,}
          ]
        )
      }
      if (index==2) {
        seteditInfo(
          [
            {isEdit:false,},
            {isEdit:false,},
            {isEdit:false,}
          ]
        )
      }
    },
    choseImg: (TypImg) =>{// choseing image
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        compressImageQuality: 0.7
      }).then(image => {
        if(image!=null){
          if (TypImg=='image') {
            var oldImg = User.image
            User.image=image.path
            Alerts.alertSaveChanges(oldImg,TypImg)
          }else{
            var oldImg = User.imageBackground
            User.imageBackground=image.path
            Alerts.alertSaveChanges(oldImg,TypImg)
          }
        setrender(!render)
        }
      });
    }
  } // on end Edit missing done alert

  const UplodChanges = async() =>{// UplodChanges
    AsyncStorage.setItem(User.name, JSON.stringify(User));
    //AsyncStorage.
    //console.log(User.image);
  }

  const logout = async ()=>{// Log out from the user
      User.logged= false,
      AsyncStorage.setItem(User.name, JSON.stringify(User));
      User.name= '',
      User.password= '',
      User.mail = '',
      User.image = image,
      User.imageBackground = imageBackground,
      User.list=[]
      props.navigation.navigate('LogIn')//cancel < this back
  }

  const ChangingUserNameAndChangingTheKey =async(newName)=>{
    let users = await AsyncStorage.getAllKeys()
    if (!users.includes(newName)) {
      User.logged=false
      UplodChanges()
      let newUser ={...JSON.parse(await AsyncStorage.getItem(User.name))}
      newUser.name=newName;
      AsyncStorage.setItem(newUser.name, JSON.stringify(newUser));
      AsyncStorage.removeItem(User.name);
      setUser({
        name: '',
        password: '',
        logged: false,
        mail : '',
        image :image,
        imageBackground : imageBackground,
        list:[]
      })
      props.navigation.navigate('LogIn')
      //AsyncStorage.removeItem
    }else{
      Alerts.alertNameIncludes()
    }
  }

  const UserCondition =(infoType)=>{
    if (infoType=='password'&&changingText.length>7) {
      return true
    }if (infoType=='name'&&changingText.length>3&&!changingText.includes(" ")) {
      return true
    }if (infoType=='mail'){
      //setChangedText(changingText.toLocaleLowerCase())
      if(!changingText.includes(" ")&&changingText.includes("@")&&changingText.includes(".com")){
        return true
      }
    }else{
      false
    }
  } // export

  const deleteAcaunt=()=>{
    AsyncStorage.removeItem(User.name);
    props.navigation.navigate('LogIn')
  }

  const UiFace = ()=>{
    return(
      <Pressable onPress={()=>setOnPressUserBacImg(true)} onLongPress={()=>Alerts.alertForchoseImg('imageBackground')}//choseImg('imageBackground')
          style={styles.ContinerImgs}>

          <ImageBackground 
          source={{uri: User.imageBackground,}}
          style={styles.ImgBackground}>

            <Pressable onPress={()=>setOnPressUserImg(true)} onLongPress={()=>Alerts.alertForchoseImg('image')}>
              <Image
              source={{uri: User.image}}
              style={styles.img}/>
            </Pressable>

          </ImageBackground>

          <ShowImg pressed={onPressUserImg} close={setOnPressUserImg} Img={User.image}/>
          <ShowImg pressed={onPressUserBacImg} close={setOnPressUserBacImg} Img={User.imageBackground}/>

        </Pressable>
    )
  }

  const UserInfo = ()=>{
    return(
      <View style={{flex:1,padding:10}}> 

          <Text style={styles.subTitle}>Info:</Text>
          {/* Info */}
          <FlatList 
          data={userInfo}
          renderItem={({ item }) => (
            <View style={styles.viewText}>
              
              <Text style={styles.text} >{item.infoType+" : "}</Text>
              <TextInput
                editable={editInfo[item.index].isEdit}
                onChangeText={(text)=>setChangedText(text)}
                value={editInfo[item.index].isEdit?changingText:item.text}
                style={[styles.text,{flexGrow:1}]}
                //onEndEditing={()=>Edit.endEdit(item.index,item.infoType)}
              />
              <TouchableOpacity style={styles.editButton} onPress={()=>(edit)?Edit.endEdit(item.index,item.infoType):Edit.startEdit(item.index,item.infoType)}>
                <Image style={styles.ImgBackground} source={!editInfo[item.index].isEdit?require('../../asets/images/edit.png'):UserCondition(item.infoType)?require('../../asets/images/Done.png'):require('../../asets/images/X.png')}/>
              </TouchableOpacity>
            </View>
          )}/>

        {/* Button st*/}
        <View style={{flex: 1,alignItems:'center',justifyContent:'center',borderRadius:10}} >
          <TouchableOpacity style={styles.logout} onPress={logout}>
            <Text style={styles.subTitle}>log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteAcaunt} onPress={deleteAcaunt}>
            <Text style={styles.subTitle}>delete acaunt</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }//xxxxx


  {/*/////////////////// View ///////////////////*/}
  return (
    <View style={{flex:1, backgroundColor: '#12171f',}}>
      <TheHeader textHeader={'MGL'}/>

      <SectionList
        sections={[
          {TheHeader: UiFace, data: [1]} ]}
          renderSectionHeader={({section}) => (<section.TheHeader/>)}
          renderItem={({ item }) => (
          
            <View style={{flex:1,padding:10}}> 

              <Text style={styles.subTitle}>Info:</Text>
              {/* Info */}
              <FlatList 
              data={userInfo}
              renderItem={({ item }) => (
                <View style={styles.viewText}>
                  
                  <Text style={styles.text} >{item.infoType+" : "}</Text>
                  <TextInput
                    editable={editInfo[item.index].isEdit}
                    onChangeText={(text)=>setChangedText(text)}
                    value={editInfo[item.index].isEdit?changingText:item.text}
                    style={[styles.text,{flexGrow:1}]}
                    //onEndEditing={()=>Edit.endEdit(item.index,item.infoType)}
                  />
                  <TouchableOpacity style={styles.editButton} onPress={()=>(edit)?Edit.endEdit(item.index,item.infoType):Edit.startEdit(item.index,item.infoType)}>
                    <Image style={styles.ImgBackground} source={!editInfo[item.index].isEdit?require('../../asets/images/edit.png'):UserCondition(item.infoType)?require('../../asets/images/Done.png'):require('../../asets/images/X.png')}/>
                  </TouchableOpacity>
                </View>
              )}/>
    
              {/* Button st*/}
    
              <View style={{flex: 1,alignItems:'center',justifyContent:'center',borderRadius:10}} >

              <TouchableOpacity style={styles.logout} onPress={()=>props.navigation.navigate('MyList',{ reload: true })}>
                  <Text style={styles.subTitle}>my list</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logout} onPress={logout}>
                  <Text style={styles.subTitle}>log out</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteAcaunt} onPress={deleteAcaunt}>
                  <Text style={styles.subTitle}>delete acaunt</Text>
                </TouchableOpacity>
              </View>
    
          </View>

          )}
      />

    </View>
  );
};

const styles = StyleSheet.create({

  /* Images*/
  ContinerImgs:{height: 150, width: '100%', backgroundColor:'#4545',marginBottom:45,elevation:80,shadowOffset:{width:80,height:80},shadowColor:'#4545',shadowOpacity:0.8,borderRadius:10},
  ImgBackground:{height: '100%', width: '100%',alignItems:'flex-end',marginBottom:60,shadowOffset:{width:80,height:80},shadowColor:'#4545',shadowOpacity:0.8,borderRadius:10},
  img:{height: 100, width: 100, marginHorizontal:20, marginVertical:95, borderRadius:100, borderWidth:2, borderColor:'black',},

  /* view Info */
  subTitle:{fontSize:24,fontWeight:'600', color:'#35c6d7'},
  icnfoContact:{flex:1, padding:5,paddingHorizontal:20},
  text :{fontSize:20,fontWeight:'500',color:'#199',margin:5},
  viewText :{borderWidth:2,margin:10,paddingHorizontal: 10,borderColor: '#199',
  /*^*/borderRadius:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between',},
  editButton:{height:30,width:30,borderRadius:5,borderWidth:1,borderColor:'#199',padding:2,backgroundColor: '#297164',},

  /* Button st*/
  logout:{height:50,width:'40%',backgroundColor:'#235687',alignItems:'center',justifyContent:'center',borderRadius:10,margin:10},
  deleteAcaunt:{height:50,width:'40%',backgroundColor:'#772339',alignItems:'center',justifyContent:'center',borderRadius:10,margin:10}
})

export default UserScreen;
