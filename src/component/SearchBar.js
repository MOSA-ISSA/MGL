import React,{useState} from 'react';
import {View, StyleSheet, Image , TextInput, TouchableOpacity} from 'react-native';
import { globalHW, globalImage,} from '../../Storge/global';

const SearchBar =({setSortModalVisible,Games,setGames})=>{
    const [search, setSearch] = useState("");

    const filteredGames =(search)=>{
        let gameName = Games.filter((game) =>
        game.gameName.toLowerCase().includes(search.toLowerCase()))
        let gameShortName = Games.filter((game) =>
        game.gameShortName.toLowerCase().includes(search.toLowerCase()))
        let unique = [...gameName,...gameShortName].filter((game, index) => {
          return (
            index ===
            [...gameName,...gameShortName].findIndex((obj) => {
              return obj.key === game.key;
            })
          );
        });
        setSearch(search)
        setGames([...unique])
      }

    return(
      <View style={styles.searchBar}>

        <TouchableOpacity style={styles.sortButton} onPress={()=>setSortModalVisible(true)}>
          <Image
                source={{uri: globalImage.sort}}
                style={styles.ImageSt}/>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>filteredGames(search)} style={{paddingHorizontal:3}}>
        <Image
          source={{uri: globalImage.search}}
          style={styles.ImageSt}/>
        </TouchableOpacity>

        <TextInput style={styles.searchInput}
            onChangeText={(v)=>filteredGames(v)}
            value={search}
            placeholder="Enter game name"
            // onEndEditing={()=>filteredGames()}
        />

      </View>
    )
  }

const styles = StyleSheet.create({
    searchBar:{
        backgroundColor:'#26868d',borderColor:'#4545',borderWidth:1,
        flexDirection:'row', margin:5, padding:5, borderRadius:10,
        elevation:5
    },
    sortButton:{marginHorizontal:2, alignItems:'center',justifyContent:'center'},

    searchInput:{
        fontSize: 18,backgroundColor:'#4545',
        height: globalHW.windowHeight*0.047,
        padding:0, margin:0, paddingStart:10,
        flexGrow:1,borderRadius:10
    },
    ImageSt:{
        height: globalHW.windowHeight*0.047,
        width: globalHW.windowHeight*0.047, 
        // borderRadius:10
    }
})

export default SearchBar;
