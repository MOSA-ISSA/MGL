import React,{useContext, useState} from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Linking, ScrollView, Alert} from 'react-native';
import TheButton from '../../component/TheButton';
import TheContext from '../../../Storge/thisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalHW, ScreenNames } from '../../../Storge/global';
import TheHeader from '../../component/TheHeader';
import GamesCard from '../../shared/GamesCard';
import {useNavigation} from '@react-navigation/native';
import AddDoneAnimation from '../../asets/animations/AddDoneAnimation';
import TheModal from '../../component/TheModal';

const GameDetails=({ route })=> {
  console.log('GameDetails');
  const navigation = useNavigation();

  const { item } = route.params;
  const {User,setUser} = useContext(TheContext)
  const [chekName, setName]= useState("")
  const [modalVisible, setModalVisible]= useState(false)

  const Tags = [...item.genres,...item.Mode,...item.age]

  const OpacityViews = () => {

    {/* {Array.from({length: 9}, (a, i) => (
            <View style={{flex: 0.01, backgroundColor: '#093b4d', opacity: (i + 1) / 10}} />
          ))} */}

    {/* <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.1}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.2}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.3}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.4}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.5}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.6}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.7}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.8}}></View>
    <View style={{flex:0.01, backgroundColor:'#093b4d',opacity:0.9}}></View> */}

    const views = [];
    for (let i = 1; i <= 9; i++) {
      views.push(
        <View
          key={i}
          style={{
            height: globalHW.windowHeight*0.0045,
            backgroundColor: '#12171f',
            opacity: i / 10,
          }}
        />
      );
    }
    return <>{views}</>;
  }

  const LinkButtonsStore =()=>{

    const platform = ['PlayStation','Xbox','PC','Nintendo Switch']

    const Imageplatform = [
      'https://th.bing.com/th/id/R.073d71dbaee93e4ba2fc80810815667a?rik=BqMRy2pd9BB50g&riu=http%3a%2f%2flogok.org%2fwp-content%2fuploads%2f2014%2f07%2fPlaystation-logo.png&ehk=U0mDnaee%2b3oMVb4kb7Uf4SiDriVBb1Uyyx6UUNh53eY%3d&risl=&pid=ImgRaw&r=0',
      'https://www.freepnglogos.com/uploads/xbox-one-logo-vector-24.png',
      'https://th.bing.com/th/id/R.a0c573607958bd3bd3a894fb5d5c7ae8?rik=W62iS0AZslkY1w&pid=ImgRaw&r=0',
      'https://clipground.com/images/switch-logo-png-8.png'
    ]
    const onPress =(platform)=>{
      if(platform=='PlayStation'){
        return Linking.openURL(item.PsStoreLink)
        //console.log(platform)
      }if(platform=='Xbox'){
        return Linking.openURL(item.XboxStoreLink)
        //console.log(platform)
      }if(platform=='PC'){
        return Linking.openURL(item.PCStoreLink)
        //console.log(platform)
      }if(platform=='Nintendo Switch'){
        return Linking.openURL(item.NSwitchStoreLink)
        //console.log(platform)
      }
    }

    {/* <View style={{height:globalHW.windowHeight*0.075, backgroundColor:'#093b4d',
          flexDirection:'row', justifyContent: 'space-between',marginHorizontal:10}}>

            <TouchableOpacity style={{height:globalHW.windowHeight*0.075,width:globalHW.windowHeight*0.075, borderRadius:40,
              alignItems: 'center',justifyContent: 'center', borderWidth:1}}>
              <Image
                  source={{uri: 'https://th.bing.com/th/id/R.073d71dbaee93e4ba2fc80810815667a?rik=BqMRy2pd9BB50g&riu=http%3a%2f%2flogok.org%2fwp-content%2fuploads%2f2014%2f07%2fPlaystation-logo.png&ehk=U0mDnaee%2b3oMVb4kb7Uf4SiDriVBb1Uyyx6UUNh53eY%3d&risl=&pid=ImgRaw&r=0'}}
                  style={{height:'100%' ,width:'100%',}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height:globalHW.windowHeight*0.075,width:globalHW.windowHeight*0.075, borderRadius:40,
              alignItems: 'center',justifyContent: 'center', borderWidth:1}}>
              <Image
                  source={{uri: 'https://www.freepnglogos.com/uploads/xbox-one-logo-vector-24.png'}}
                  style={{height:'100%' ,width:'100%',}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height:globalHW.windowHeight*0.075,width:globalHW.windowHeight*0.075, borderRadius:40,
              alignItems: 'center',justifyContent: 'center', borderWidth:1}}>
              <Image
                  source={{uri: 'https://th.bing.com/th/id/R.a0c573607958bd3bd3a894fb5d5c7ae8?rik=W62iS0AZslkY1w&pid=ImgRaw&r=0'}}
                  style={{height:'55%' ,width:'55%',}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{height:globalHW.windowHeight*0.075,width:globalHW.windowHeight*0.075, borderRadius:40,
              alignItems: 'center',justifyContent: 'center', borderWidth:1}}>
              <Image
                  source={{uri: 'https://clipground.com/images/switch-logo-png-8.png'}}
                  style={{height:'70%' ,width:'70%',}}/>
            </TouchableOpacity>
          </View> */}

    const views = [];
    for (let i = 1; i <= 4; i++) {
      if (item.platform.includes(platform[i-1])) {
        views.push(
          <TouchableOpacity
           key={i}
           style={styles.linkButtons}
           onPress={()=>onPress(platform[i-1])}
            >
            <Image
              source={{uri: Imageplatform[i-1]}}
              style={{height:(platform[i-1]=='PC'||
                platform[i-1]=='Nintendo Switch')?'70%':'100%',
                width: (platform[i-1]=='PC'||
                platform[i-1]=='Nintendo Switch')?'70%':'100%',
              }}
            />
          </TouchableOpacity>
        );
      }
    }
    return <View style={styles.linkButtonsView}>{views}</View>;
  }

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

  const renderTags = ({ item }) => (
    <TouchableOpacity key={item} style={styles.TagsView} 
    onPress={()=>navigation.navigate(ScreenNames.TagsScreen,{SortBy:[item]})}>
      <Text key={item} style={styles.Tags}>#{item}</Text>
    </TouchableOpacity>
  );

  return (
    
    <ScrollView style={{ backgroundColor: '#12171f',flex: 1,}}>
      <TheHeader textHeader={item.gameShortName}>
        <TheButton buttonNameStyle={{fontSize: 20,}} 
          buttonName={AddorRemove.addToListButtonIcon(item)} 
          buttonStyle={styles.AddButton}
          onPress={()=>AddorRemove.handlAddToListButton(item)}
        />
        <TheModal setModalVisible={chekName==item.gameName&&modalVisible} animationType={'fade'}>
            <View style={styles.center}>
              <View style={styles.AddDoneAnimation}>
                <AddDoneAnimation setModalVisible={(value)=>[setName(value),setModalVisible(value)]}/>
              </View>
            </View>
        </TheModal>
      </TheHeader>

      <ImageBackground
        source={{uri: item.image}}
        style={styles.backgroundImage}
      />
          
      <View style={{flexDirection:'row'}}>
        <GamesCard item={item}>
        </GamesCard>
        <View style={styles.gameInfoView}>
          <Text style={styles.gameInfoTitle}>{ item.gameName }</Text>
          <Text style={styles.gameInfoText}>Developer: {item.Developer}</Text>
          <Text style={styles.gameInfoText}>Publisher: {item.Publisher}</Text>
          <Text style={styles.gameInfoText}>
            {item.Release.day}/{item.Release.manth}/{item.Release.year}
          </Text>
        </View>
        <View style={styles.linkButtonsViewColumn}>
          <TouchableOpacity
            style={styles.linkButtons}
            //onPress={()=>onPress(platform[i-1])}
              >
                <Text style={styles.gameInfoTitle}>{item.rating}/10</Text>
          </TouchableOpacity>
          
        </View>
      </View>

      <OpacityViews/>

      <View style={{flex:1, backgroundColor:'#12171f'}}>
        <LinkButtonsStore/>

      <View style={{margin:10}}>
      
      <Text style={styles.sideHeaders}>Tags</Text>
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
      {Tags.map(item => renderTags(item={item}))}
      </View>

      <Text style={styles.sideHeaders}>About</Text>
       <Text style={styles.gameAbout}>{item.About}</Text>
      <Text style={styles.sideHeaders}>rating</Text>
       <Text>{item.rating}</Text>
      <Text style={styles.sideHeaders}>more Image</Text>
      <Text>Image</Text>
      <Text style={styles.sideHeaders}>triler</Text>
      <Text>triler</Text>
      <Text style={styles.sideHeaders}>recomended</Text>
            
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: globalHW.windowHeight*0.5,width: '100%',
    borderRadius:10, flexDirection:'column-reverse',
    position: 'absolute',
    left: 0,
    top: globalHW.windowHeight*0.055,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  TagsView:{
    padding:1, borderWidth:2,
    margin:6,borderRadius:10 ,
    backgroundColor: '#199',
  },
  Tags: {
    padding: 1,
  },
  sideHeaders: {
    fontSize: 20,
    backgroundColor: '#247b81',
  },
  center:{
    flex:1, 
    justifyContent:'center',alignItems: 'center',
  },
  AddButton:{
    height:globalHW.windowWidth*0.0755,
    width:globalHW.windowWidth*0.0755, 
    borderRadius:40, 
    backgroundColor:'#12171f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  AddDoneAnimation:{
    height:(globalHW.windowWidth*0.5),width:(globalHW.windowWidth*0.5), 
    backgroundColor:"#0d697a",borderRadius:100,
    borderColor:'black',borderWidth:2,elevation:5
  },
  gameInfoView:{
    flex:3.5,
    flexDirection:'column',
    paddingLeft:20, 
    justifyContent:'center',
    // backgroundColor:'red',
  },
  gameInfoTitle:{
    fontSize:19,
    color:'white',
    fontWeight:'600'
  },
  gameInfoText:{
    fontSize:16,
    color:'white',
    fontWeight:'400'
  },
  linkButtons:{
    height:globalHW.windowHeight*0.075,
    width:globalHW.windowHeight*0.075, 
    borderRadius:40,
    alignItems: 'center',
    justifyContent: 'center', 
    borderWidth:1,
    backgroundColor: '#26868d',
  },
  linkButtonsView:{
    height:globalHW.windowHeight*0.075,
    backgroundColor:'#12171f',
    margin:10,
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  linkButtonsViewColumn:{
    flexDirection:'column',
    flex:1,
    alignItems:'center',
    margin:5,
  },
  gameAbout:{
    color:'#247b81'
  }

});

export default GameDetails