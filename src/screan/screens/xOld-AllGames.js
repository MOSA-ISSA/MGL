import React, { useState, useContext, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, SectionList, Image, Alert, Modal, Pressable } from 'react-native';
import { globalHW, globalStyles } from '../../../Storge/global';
import Card from '../../component/card';
import {useNavigation} from '@react-navigation/native';
import Games from '../../../Storge/GameData';
import TheButton from '../../component/TheButton';
import TheContext from '../../../Storge/thisContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddDoneAnimation from '../../asets/animations/AddDoneAnimation';
import TheModal from '../../component/TheModal';
import {age, Genre, platform,} from '../../../Storge/SortChices';
import GamesCard from '../../component/GamesCard';


const AllGames=()=> {
  console.log('AllGames');

  const [games,setGames]= useState([...Games])
  const navigation = useNavigation();
  const {User} = useContext(TheContext)
  const [modalVisible, setModalVisible]= useState(false)
  const [SortModalVisible, setSortModalVisible]= useState(false)
  const [chekName, setName]= useState("")
  const [sortButtonShowsModal, setSortTypeButtonShowsModal] = useState(false);
  const [type, setType]= useState("")
  const [selectedTypeChices, setSelectedTypeChices] = useState([]);

  const sortData = {
    reSort : ()=>{setGames([...Games])},////////////////////////

    sortDataAZ : (Type) => {
      const sortedData = [...games].sort((a, b) => {

        const nameA = a.gameName.toUpperCase();
        const nameB = b.gameName.toUpperCase();

        if (Type=='A-Z') {
          if (nameA < nameB) {
            return -1;
          }
            if (nameA > nameB) {
              return 1;
          }
        }
        if (Type=='Z-A') {
          if (nameB < nameA) {
            return -1;
          }
            if (nameB > nameA) {
              return 1;
          }
        }
          return 0;
        });
        setGames(sortedData);
    },

    sortDataRating : (Type) => {
      const sortedData = [...games].sort((a, b) => {
        if (Type === 'low') {
          return a.rating - b.rating;
        }
        if (Type === 'high'){
          return b.rating - a.rating;
        }
      });
      setGames(sortedData);
      //setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    },
  }

  const removefromList =(item)=>{
    Alert.alert('Do you whant to remove the game from your list', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'yes', onPress: () => {
        let gameNameIndex=User.list.findIndex((element) => element == item)
        //console.log(gameNameIndex);
        User.list.splice(gameNameIndex,gameNameIndex+1)
        AsyncStorage.setItem(User.name, JSON.stringify(User));
        console.log('removed');
        setName("")
      }},
    ]);
  }

  const handlAddToListButton=(item)=>{
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
  }

  const addToListButtonIcon=(item)=>{

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

  const SortTypeButtonContent =()=>{

    
    const [TypeChices,setTypeChices] =useState(selectedTypeChices);
    const data =  type=='Genre'?Genre:type=='age'?age:type=='platform'?platform:null

  const toggleG = (item) => {
    if (TypeChices.includes(item)) {
      setTypeChices(TypeChices.filter((g) => g !== item));
    } else {
      setTypeChices([...TypeChices,item])
    }
  };
  


    return(
      <View style={{width:'100%',height:'100%',flexDirection:'column',padding:10}}>

        <View style={styles.sortModalContent} >

          <TouchableOpacity  onPress={()=>{setSortTypeButtonShowsModal(false),setSortModalVisible(true)}}>
            <Text style={{fontSize:30}}> {'<'} </Text>
          </TouchableOpacity>
            <Text style={{fontSize:30, fontWeight:'700',paddingBottom:3}}>{type} :</Text>
          
          <TheButton buttonName={"Apply"} buttonStyle={{backgroundColor: '#4545',height: 40,width: 60,}} buttonNameStyle={{fontSize: 20,}}
            onPress={()=>{
              if(TypeChices.length!=0){
                  setGames(Games.filter((game) =>
                      TypeChices.every((g) => game.genres.includes(g)||game.platform.includes(g)||game.age.includes(g))
                    )
                  )
              }else{
                setGames([...Games])
               setTypeChices([])
              }
              setSortTypeButtonShowsModal(false),setSortModalVisible(true),setSelectedTypeChices([...TypeChices])
              }} 
          />

        </View>
        
        <SectionList
          sections={[
            {hed: 'All games', data: data}]}
            renderSectionHeader={({section}) => (
            <TouchableOpacity onPress={() => {setSelectedTypeChices([]), setTypeChices([]) }}>
              <Text>Clear</Text>
            </TouchableOpacity>
            )}
            renderItem={({ item }) => (
              <Pressable style={styles.sortModalContent}>
                <Text style={{fontSize:16}}> {item.type} </Text>
                <TouchableOpacity style={[styles.sortModalButtonChoice,{height:globalHW.windowHeight*0.03 , width:globalHW.windowHeight*0.03,}]}
                  onPress={() => toggleG(item.type)}>
                  <View style={{flex:1 ,backgroundColor: TypeChices.includes(item.type) ? 'green' : '#4545' }}></View>
                </TouchableOpacity>
              </Pressable>
            )}
          />
      </View>
    )
  }
  
  const SortModal =()=>{
    
    return(
      <Pressable style={{ flex:1,flexDirection:'column-reverse',}}
       onPress={()=>setSortModalVisible(false)}>
        
        <Pressable style={styles.sortModal}>
          {/* hed */}
          <View style ={{height:'20%' ,width:'90%', flexDirection:'row', justifyContent:'space-between',paddingTop:5}}>
            <Text style={{fontSize:30, fontWeight:'700'}}>sort by -</Text>

            <TouchableOpacity  onPress={()=>[sortData.reSort(),setSortModalVisible(false)]}>
            <Text style={{fontSize:20, fontWeight:'500'}}>ReSORT</Text>
            </TouchableOpacity>
          </View>

          {/* content */}
          <View style={{width: '100%',height: '60%',}}>
            
            <View style={styles.sortModalContent}>

              <Text style={{fontSize:20,}}>Name -</Text>

              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('A-Z'),setSortModalVisible(false)]}>
                  <Text style={{fontSize:20,}}>(A-Z)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('Z-A'),setSortModalVisible(false)]}>
                  <Text style={{fontSize:20,}}>(Z-A)</Text>
                </TouchableOpacity>
              </View>
              
            </View>

            <View style={styles.sortModalContent}>
              <Text style={{fontSize:20,}}> Rating - </Text>

              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("low"),setSortModalVisible(false)]}>
                  <Image
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png'}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("high"),setSortModalVisible(false)]}>
                  <Image
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png'}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
              </View>

            </View>
            <View style={styles.sortModalContent}>
              <Text style={{fontSize:20,}}> Release Date  </Text>
              
              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.sortModalButtonChoice}>
                  <Image
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png'}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortModalButtonChoice}>
                  <Image
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png'}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
              </View>

            </View>

          </View>

          {/* <SortButtonShowsModal/> */}
          <View style={{flex:1.5,flexDirection:'row'}}>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('Genre')}}>
              <Text style={{fontSize:16}}> Genre ^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('platform')}}>
              <Text style={{fontSize:16}}> platform ^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('age')}}>
              <Text style={{fontSize:16}}> age ^</Text>
            </TouchableOpacity>
          </View>

          

        </Pressable>
      </Pressable>      
    )
  }

  const ScreanHed =({title})=>{
    return(
      <View style={{flex:1, width:'100%', padding:10,}}>
        
        <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
          <View style={{flex:1, flexDirection:'row',}}>
            <TouchableOpacity style={{flex:0.15 ,marginHorizontal:5, alignItems:'center',justifyContent:'center'}} onPress={()=>setSortModalVisible(true)}>
              <Image
                    source={{uri: 'https://th.bing.com/th/id/R.339b47ac85f8459e966b5faf4fb5fa7e?rik=YApSb4LsQGeNHw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_195267.png&ehk=dh%2buEUEjYSlZMqT0VMa%2f9LqRWVhi8tm7zU57s8UK8xM%3d&risl=&pid=ImgRaw&r=0'}}
                    style={{height: 30,width: 30,}}/>
            </TouchableOpacity>
            <Text style={{fontSize:20,paddingBottom:10}}>{title}</Text>
          </View>
          <TouchableOpacity style={{flex:0.1, paddingEnd:10 ,}} onPress={()=>navigation.navigate('ScreanSearch')}>
            <Image
                  source={{uri: 'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/09_search-1024.png'}}
                  style={{height: 30,width: 30, borderRadius:10}}/>
          </TouchableOpacity>
        </View>

        <TheModal setModalVisible={SortModalVisible}>
          {/* <View style = {{flex:1, backgroundColor: '#4545',}}/> */}

          <SortModal/>
          
        </TheModal>

        <TheModal setModalVisible={sortButtonShowsModal}>

            <Pressable style={{ flex:1,flexDirection:'column-reverse',}}
              onPress={()=>{setSortTypeButtonShowsModal(false),setSortModalVisible(true)}}> 
              <Pressable style={styles.sortModal}>
                <SortTypeButtonContent/>
              </Pressable>
            </Pressable> 
        </TheModal>

      </View>
    )
  }

  const TheGames =({item})=>{
    return(
      <FlatList
      style={{flex:1,alignItems:'center',justifyContent:'center'}}
      data={item}
      numColumns={3}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('GameDetails', {item})}>
          <GamesCard item={item}>
            <TheButton buttonName={addToListButtonIcon(item)} buttonStyle={{height: 20,width: 20, backgroundColor: '#199', borderRadius:20}}
              buttonNameStyle={{fontSize: 15,}}
              onPress={()=>handlAddToListButton(item)} />
          </GamesCard>


            <TheModal setModalVisible={chekName==item.gameName&&modalVisible} animationType={'fade'}>
              <View style={{ flex:1, justifyContent:'center',alignItems: 'center',}}>
                <View style={{ height:(globalHW.windowWidth*0.5),width:(globalHW.windowWidth*0.5), backgroundColor:"#0d697a",borderRadius:100,borderColor:'black',borderWidth:2,elevation:5}}>
                  <AddDoneAnimation setModalVisible={(value)=>[setName(value),setModalVisible(value)]}/>
                </View>
              </View>
            </TheModal>
            

        </TouchableOpacity>
      )} />
    )
  }

  const SortButtonShowsModal =()=>{
    {/* <View style={{flex:1.5,flexDirection:'row'}}>
          <TouchableOpacity style={styles.sortModalButton}>
            <Text style={{fontSize:16}}> Genre ^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortModalButton}>
            <Text style={{fontSize:16}}> platform ^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortModalButton}>
            <Text style={{fontSize:16}}> age ^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sortModalButton}>
            <Text style={{fontSize:16}}> VR ^</Text>
          </TouchableOpacity>
        </View> */}
    const data=[
      { type: 'Genre', onPress: ()=>null },
      { type: 'platform', onPress: ()=>null },
      { type: 'age', onPress: ()=>null },
      { type: 'VR', onPress: ()=>null },
    ]
    return(
      <View style={{width:'100%',height:'20%',flexDirection:'row'}}>
        {data.map((item) => (
          <TouchableOpacity style={styles.sortModalButton}>
            <Text style={{fontSize:16}}> {item.type} </Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  const SortChoices =()=>{
    {/* <View style={{width: '100%',height: '60%',}}>

          <View style={styles.sortModalContent}>

            <Text style={{fontSize:20,}}>Name -</Text>

            <View style ={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('A-Z'),setSortModalVisible(false)]}>
                <Text style={{fontSize:20,}}>(A-Z)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('Z-A'),setSortModalVisible(false)]}>
                <Text style={{fontSize:20,}}>(Z-A)</Text>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={styles.sortModalContent}>
            <Text style={{fontSize:20,}}> Rating - </Text>

            <View style ={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("low"),setSortModalVisible(false)]}>
                <Image
                source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png'}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("high"),setSortModalVisible(false)]}>
                <Image
                source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png'}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.sortModalContent}>
            <Text style={{fontSize:20,}}> Release Date  </Text>
            
            <View style ={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.sortModalButtonChoice}>
                <Image
                source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png'}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortModalButtonChoice}>
                <Image
                source={{uri: 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png'}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
            </View>

          </View>
        </View> */}

    const Choices =[
      {Choic:'Name from', onPress1:()=>sortData.sortDataAZ('A-Z'), onPress2:()=>sortData.sortDataAZ('Z-A'), key:1,
        uri1: 'https://th.bing.com/th/id/R.07d4f6fb90670bf13b7b3883b2e9846a?rik=3gCuDRWjj%2bLMsA&pid=ImgRaw&r=0',
        uri2: 'https://th.bing.com/th/id/R.df22274af099435b2c726ddc49b9ab23?rik=7PIcROymQMT6aQ&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fZ-Letter-PNG-Pic.png&ehk=DcA9e%2bcT0tPfHCXsXFwe9uqT%2bZb4NS%2fqBqmPjKKcIV0%3d&risl=&pid=ImgRaw&r=0',
      },

      {Choic:'Rating', onPress1:()=>sortData.sortDataRating("low") ,onPress2:()=>sortData.sortDataRating("high"), key:2,
        uri1:'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png',
        uri2:'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png',
      },

      {Choic:'Release Date', onPress1:()=>null, onPress2:()=>null, key:3,
        uri1:'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png',
        uri2:'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png',
      },
    ]
    return(
      <View style={{width: '100%',height: '60%',}}>
        {Choices.map((item) => (

          <View style={styles.sortModalContent}>

            <Text style={{fontSize:20,}}>{item.Choic} -</Text>

            <View style ={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[item.onPress1(),setSortModalVisible(false)]}>
                <Image
                source={{uri: item.uri1}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[item.onPress2(),setSortModalVisible(false)]}>
                <Image
                source={{uri: item.uri2}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
            </View>

          </View>
        ))}
      </View>
    )
  }

  return (
    <View style={globalStyles.container}>
      
      <SectionList
      sections={[
        {title: 'All games', data: games}]}
        renderSectionHeader={({section}) => (<ScreanHed title={section.title}/>)}
        renderSectionFooter={({section}) => (<TheGames item={section.data}/>)}
        renderItem={({ item }) => (null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sortModal:{
   flex:0.5,flexDirection:'column',borderTopRightRadius:30,
   borderTopLeftRadius:30, backgroundColor: '#264348',alignItems:'center',
   justifyContent:'center', borderWidth:2, elevation:10,
  },
  sortModalContent:{
    width:'100%', borderBottomWidth:1, margin:5, padding:10, alignItems:'center',
    justifyContent:'space-between', flexDirection:'row', borderStyle:'dashed'
  },
  sortModalButton:{
    flex:1, borderRadius:10, alignItems:'center', justifyContent:'center', paddingHorizontal:5, margin:5,
     marginVertical:15,backgroundColor:"#179999",
  },
  sortModalButtonChoice:{marginHorizontal:4, padding:3, backgroundColor: "#00827f", borderRadius:10,}
})


export default AllGames

{/* <FlatList
       data={reviews}
       numColumns={1}
       horizontal
       //loop={true}
        renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ReviewDetails', {item})}>
          <Card>
            <View style={{height:95,width:95,backgroundColor:'#4545'}}></View>
            <Text style={globalStyles.titleText}>{mackTitleShort(item.title)}</Text>
          </Card>
        </TouchableOpacity>
      )} /> */}