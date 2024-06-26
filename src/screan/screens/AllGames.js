import React, {useEffect, useState} from 'react';
import { StyleSheet, View,} from 'react-native';
import Game from '../../../Storge/GameData';
import TheModal from '../../component/TheModal';
import RenderGameCard from '../../component/RenderGameCard';
import SearchBar from '../../component/SearchBar';
import SortModal from '../../component/SortModal';
import SortTypeButtonContent from '../../component/SortTypeButtonContent';
import { checkRespond} from '../../res/API';
import { getAllGamesData, getAllGamesName, getGameByName, getGamesDataROWG } from '../../res/GamesAPI';
import GamesCard from '../../component/GamesCard';
import GamesCardServer from '../../component/GamesCardServer';
import RenderGameCardServer from '../../component/RenderGameCardServer';
import RenderGameCardRAWG from '../../component/RenderGameCardRAWG';


const AllGames = () => {
  console.log('AllGames');

  const BackUpGame = [...Game]
  const [ServerGames, setServerGames] = useState({})
  const [games, setGames] = useState([...Game])
  const [type, setType] = useState("")
  const [SortModalVisible, setSortModalVisible] = useState(false)
  const [sortButtonShowsModal, setSortTypeButtonShowsModal] = useState(false);
  const noSelectedTypeChices ={
    genres:[],
    platforms:[],
    ages:[],
  }
  const [selectedTypeChices, setSelectedTypeChices] = useState({...noSelectedTypeChices});

  const sortData = {
    reSort: () => { setGames([...BackUpGame]), setSelectedTypeChices({...noSelectedTypeChices}) },

    sortDataAZ: (Type) => {
      const sortedData = [...games].sort((a, b) => {

        const nameA = a.gameName.toUpperCase();
        const nameB = b.gameName.toUpperCase();

        const sortAToZ = () => {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        };

        const sortZToA = () => {
          if (nameB < nameA) {
            return -1;
          }
          if (nameB > nameA) {
            return 1;
          }
          return 0;
        };

        const typeCallBack = {
          AZ: sortAToZ,
          ZA: sortZToA,
        };

        return typeCallBack[Type]?.();
      });
      setGames(sortedData);
    },
    
    sortDataRating: (Type) => {
      const sortedData = [...games].sort((a, b) => {

        const typeCallBack = {
          low: a.rating - b.rating,
          high: b.rating - a.rating,
        };

        return typeCallBack[Type]
      });
      setGames(sortedData);
    },
    
    sortDataRelease: (Type) => {

      const sortedData = BackUpGame.sort((a, b) => {
        const aDate = new Date(`${a.Release.year}-${a.Release.manth}-${a.Release.day}`);
        const bDate = new Date(`${b.Release.year}-${b.Release.manth}-${b.Release.day}`);
        
        const typeCallBack = {
          low: aDate - bDate,
          high: bDate - aDate,
        };

        return typeCallBack[Type]
      });
      setGames(sortedData);
    },
  }

  const params = {
    SortTypeButtonContent: {
      selectedTypeChices,
      setGames,
      setSelectedTypeChices,
      setSortModalVisible,
      setSortTypeButtonShowsModal,
      type,
      noSelectedTypeChices
    },
    sortModal: {
      setSortModalVisible,
      sortData,
      setType,
      setSortTypeButtonShowsModal,
    },
    SearchBar: {
      setSortModalVisible,
      Games: [...BackUpGame],
      setGames,
    }
  }//params

  // const getAllGamesFromApi = () => {
  //   getAllGamesName()
  //     .then((res) => {
  //       console.log("all games: ", res.games);
  //     })
  // };
  // getAllGamesFromApi()

  const Respond = () => {
    checkRespond()
      .then((res) => {
        console.log(res);
      })
  };
  Respond()

  // const getGameByNameFromAPI=()=>{
  //   getGameByName({"gameName":"BioShock"})
  //     .then((res)=>{
  //       console.log(res.GameData.name);
  //       setServerGames(res.GameData)
  //     })
  // }

  const getAllGamesDataFromAPI =()=>{
    getAllGamesData().then((res)=>{
      console.log(res.games);
      // setServerGames({...res.games})
    })
  }

  // useEffect(() => {
  //   // getAllGamesDataFromAPI()
  //   // getTheGamesDataROWG()
  // }, []);

  return (
    <View style={styles.screen}>

      <SearchBar {...params.SearchBar}/>

      <RenderGameCard games={games} />
      {/* <RenderGameCardRAWG/> */}
      {/* <GamesCardServer item={ServerGames}/> */}
      {/* <RenderGameCardServer games={ServerGames}/> */}

      <TheModal setModalVisible={SortModalVisible}>
        <SortModal {...params.sortModal} />
      </TheModal>

      <TheModal setModalVisible={sortButtonShowsModal}>
        <SortTypeButtonContent {...params.SortTypeButtonContent} />
      </TheModal>

    </View>
  )
}

const styles = StyleSheet.create({

  screen: {
    backgroundColor: '#12171f',
    flex: 1,
    padding: 2,
  }

});


export default AllGames;