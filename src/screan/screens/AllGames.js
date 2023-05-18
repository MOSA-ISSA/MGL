import React, {useState} from 'react';
import { StyleSheet, View,} from 'react-native';
import Game from '../../../Storge/GameData';
import TheModal from '../../component/TheModal';
import RenderGameCard from '../../component/RenderGameCard';
import SearchBar from '../../component/SearchBar';
import SortModal from '../../component/SortModal';
import SortTypeButtonContent from '../../component/SortTypeButtonContent';

const AllGames = () => {
  console.log('AllGames');

  const BackUpGame = [...Game]
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
    reSort: () => { setGames([...BackUpGame]), setSelectedTypeChices({...noSelectedTypeChices}) },////////////////////////

    sortDataAZ: (Type) => {
      const sortedData = [...games].sort((a, b) => {

        const nameA = a.gameName.toUpperCase();
        const nameB = b.gameName.toUpperCase();

        if (Type == 'A-Z') {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
        }
        if (Type == 'Z-A') {
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
    sortDataRating: (Type) => {
      const sortedData = [...games].sort((a, b) => {
        if (Type === 'low') {
          return a.rating - b.rating;
        }
        if (Type === 'high') {
          return b.rating - a.rating;
        }
      });
      setGames(sortedData);
      //setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    },
    sortDataRelease: (Type) => {

      const sortedData = BackUpGame.sort((a, b) => {
        const aDate = new Date(`${a.Release.year}-${a.Release.manth}-${a.Release.day}`);
        const bDate = new Date(`${b.Release.year}-${b.Release.manth}-${b.Release.day}`);
        if (Type === 'low') {
          return aDate - bDate;
        }
        if (Type === 'high') {
          return bDate - aDate;
        }
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

  return (
    <View style={styles.screen}>

      <SearchBar {...params.SearchBar}/>

      <RenderGameCard games={games} />

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