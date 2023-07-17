import React, { useState, useContext } from 'react';
import {Alert,ImageBackground,Image,Pressable, StyleSheet,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TheContext from '../../../Storge/thisContext';
import ShowImg from '../../component/UserScreenComponent/ShowImg';
import ImagePicker from 'react-native-image-crop-picker';
import { images } from '../../asets/images/exportImages';
import { updateUserByID } from '../../res/UserAPI';

const UserScreenFace = () => {
    const {User,} = useContext(TheContext)
    const [onPressUserImg, setOnPressUserImg] = useState(false);
    const [onPressUserBacImg, setOnPressUserBacImg] = useState(false);
    const [render, setrender] = useState(true)
    const imgback=`data:${User.imageBackground};base64,${User.imageBackground}`
    const img=`data:${User.image};base64,${User.image}`


    // console.log(User.imageBackground);

    const Alerts={
      alertForchoseImg: (TypImg)=>//alert to start choseImg
      Alert.alert('do you whant to change image', '!', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () =>{choseImg(TypImg)}},
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
              [setOnPressUserImg(true),UplodChanges()]}//UplodChanges()
          else{[setOnPressUserBacImg(true),UplodChanges()]}//UplodChanges()
        }},
      ]),
    }

    const choseImg=(TypImg) =>{// choseing image
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            compressImageQuality: 0.7,
            includeBase64:true,
        }).then(image => {
            // console.log("data is\n\n", image.data);
            if(image!=null){
            if (TypImg=='image') {
                var oldImg = User.image
                User.image=image.data
                Alerts.alertSaveChanges(oldImg,TypImg)
            }else{
                var oldImg = User.imageBackground
                User.imageBackground=image.data
                Alerts.alertSaveChanges(oldImg,TypImg)
            }
            setrender(!render)
            }
        });
    }
  
    const UplodChanges = async() =>{// UplodChanges
      try{
      updateUserByID(User.ID,User)
          .then((res)=>{
            console.log(res.message);
            var trueMessage="User updated successfully"
            if (res.message==trueMessage) {
              AsyncStorage.setItem(User.ID, JSON.stringify(User));
            }else{
              Alert.alert('try agin', '!', [
                {
                  text: 'ok',
                },
              ])
            }
          })
      }catch(e){
        console.log('err');
      }
      //AsyncStorage.
      //console.log(User.image);
    }

    return(
      <Pressable onPress={()=>setOnPressUserBacImg(true)} onLongPress={()=>Alerts.alertForchoseImg('imageBackground')}//choseImg('imageBackground')
          style={styles.ContinerImgs}>

          <ImageBackground 
          source={{uri: imgback}}
          style={styles.ImgBackground}>

            <Pressable onPress={()=>setOnPressUserImg(true)} onLongPress={()=>Alerts.alertForchoseImg('image')}
            style={styles.imgView}>
              <Image
              source={{uri: img}}
              style={styles.img}/>
            </Pressable>

          </ImageBackground>

          <ShowImg pressed={onPressUserImg} close={setOnPressUserImg} Img={img}/>
          <ShowImg pressed={onPressUserBacImg} close={setOnPressUserBacImg} Img={imgback}/>

        </Pressable>
    )
}

const styles = StyleSheet.create({
  ContinerImgs:{height: 150, width: '100%', backgroundColor:'#4545',marginBottom:45,elevation:80,shadowOffset:{width:80,height:80},shadowColor:'#4545',shadowOpacity:0.8,borderRadius:10},
  ImgBackground:{height: '100%', width: '100%',alignItems:'flex-end',marginBottom:60,shadowOffset:{width:80,height:80},shadowColor:'#4545',shadowOpacity:0.8,borderRadius:10},
  imgView:{height: 100, width: 100, marginHorizontal:20, marginVertical:95, borderRadius:100, borderWidth:1, borderColor:'black',},
  img:{width:'100%',height:'100%',borderRadius:100,borderWidth:1, borderColor:'black',},
})

export default UserScreenFace;
