import React from 'react';
import { StyleSheet,View,Text,ImageBackground,TouchableOpacity,Linking,ScrollView} from 'react-native';
import { globalHW, ScreenNames } from '../../../Storge/global';
import TheHeader from '../../component/TheHeader';
import GamesCard from '../../component/GamesCard';
import {useNavigation} from '@react-navigation/native';
import InfoView from '../../component/GameDetailsCompnent/InfoView';
import LinkButtonsStoreView from '../../component/GameDetailsCompnent/LinkButtonsStoreView';
import RatingLinks from '../../component/GameDetailsCompnent/RatingLinks';
import AddGametoListButton from '../../component/AddGametoListButton';

const GameDetails=({ route })=> {
  console.log('GameDetails');
  const navigation = useNavigation();

  const { item } = route.params;

  const Tags = [...item.genres,...item.Mode,...item.ages]

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

    const Imageplatform = [
      'https://th.bing.com/th/id/R.073d71dbaee93e4ba2fc80810815667a?rik=BqMRy2pd9BB50g&riu=http%3a%2f%2flogok.org%2fwp-content%2fuploads%2f2014%2f07%2fPlaystation-logo.png&ehk=U0mDnaee%2b3oMVb4kb7Uf4SiDriVBb1Uyyx6UUNh53eY%3d&risl=&pid=ImgRaw&r=0',
      'https://www.freepnglogos.com/uploads/xbox-one-logo-vector-24.png',
      'https://th.bing.com/th/id/R.a0c573607958bd3bd3a894fb5d5c7ae8?rik=W62iS0AZslkY1w&pid=ImgRaw&r=0',
      'https://clipground.com/images/switch-logo-png-8.png'
    ]
    
    const platforms=[
      {
        platform:'PlayStation',
        Image:Imageplatform[0],
        onPress:()=>Linking.openURL(item.PsStoreLink),
      },
      {
        platform:'Xbox',
        Image:Imageplatform[1],
        onPress:()=>Linking.openURL(item.XboxStoreLink),
      },
      {
        platform:'PC',
        Image:Imageplatform[2],
        onPress:()=>Linking.openURL(item.PCStoreLink),
      },
      {
        platform:'Nintendo_Switch',
        Image:Imageplatform[3],
        onPress:()=>Linking.openURL(item.NSwitchStoreLink),
      },
    ]

    return(
      <View style={styles.linkButtonsView}>
        {platforms.map((platform)=>
          <LinkButtonsStoreView platform={platform} key={platform.platform}/>
        )}
      </View>
    )
  }

  const RenderGameInfo =()=>{

    const RenderTags = () =>(
      <View style={{flexDirection:'row',flexWrap:'wrap'}}>
        {Tags.map((item) =>
          <TouchableOpacity key={item} style={styles.TagsView} 
          onPress={()=>navigation.navigate(ScreenNames.TagsScreen,{SortBy:[item]})}>
            <Text key={item} style={styles.Tags}>#{item}</Text>
          </TouchableOpacity>
          )}
      </View>
    )

    const info =[
      {item:'Tags', Render:RenderTags()},
      {item:'About', text:true},
      // {item:'rating',},
      {item:'more Image',},
      {item:'triler',},
      {item:'recomended',},
    ]
    return(
      <View style={{margin:10}}>
        {info.map((info)=>
          <InfoView info={info} item={item} key={info.item}/>
        )}
      </View>
    )
  }
  
  const RenderMainInfo=()=>{
    const MainInfo=[
      {info:item.gameName, st:styles.gameInfoTitle},
      {info:'Developer: '+item.Developer},
      {info:'Publisher: '+item.Publisher},
      {info:item.Release.day+'/'+item.Release.manth+'/'+item.Release.year}
    ]
    return(
      <View style={styles.gameInfoView}>
        {MainInfo.map((info)=>
          <Text
           key={info.info} 
           style={info.st?info.st:styles.gameInfoText}>
            {info.info}
          </Text>
        )}
      </View>
    )
  }

  const RenderRatingLinks=()=>{
    const Rating=[]//its not ready yet
    return(
      <View style={styles.linkButtonsViewColumn}>
        {/*Rating.map*/}
        <RatingLinks rating={item.rating}/>
      </View>
    )
  }

  return (
    
    <ScrollView style={styles.ScreenView}>
      
      <TheHeader textHeader={item.gameShortName}>
        <AddGametoListButton 
        item={item} 
        buttonStyle={styles.AddGametoListButton}
        buttonNameStyle={{fontSize:20}}
        />
      </TheHeader>

      <ImageBackground
        source={{uri: item.image}}
        style={styles.backgroundImage}
      />
          
      <View style={{flexDirection:'row'}}>
        <GamesCard item={item}/>
        <RenderMainInfo/>
        <RenderRatingLinks/>
      </View>

      <OpacityViews/>

      <View style={styles.underbackgroundImageView}>
        <LinkButtonsStore/>
        <RenderGameInfo/>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({

  ScreenView:{ backgroundColor: '#12171f',flex: 1,},

  underbackgroundImageView:{flex:1, backgroundColor:'#12171f'},

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
  AddGametoListButton:{
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

});

export default GameDetails