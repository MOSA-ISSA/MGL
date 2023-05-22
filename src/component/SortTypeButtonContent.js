import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, Pressable, } from 'react-native';
import { Genre, age, platform } from '../../Storge/SortChices';
import Games from '../../Storge/GameData';
import { globalHW } from '../../Storge/global';
import HedMdal from './SortTypeButtonContentComponent/HedMdal';
import CleanChoisesView from './SortTypeButtonContentComponent/CleanChoisesView';


const SortTypeButtonContent = (props) => {

  const {
    selectedTypeChices,
    type,
    setSortTypeButtonShowsModal,
    setSortModalVisible,
    setSelectedTypeChices,
    setGames,
    noSelectedTypeChices,
  } = props

  const [TypeChices, setTypeChices] = useState(selectedTypeChices);
  const [render, setRender] = useState(false);

  console.log(type);
  console.log(TypeChices);

  const data = useMemo(() => {
    switch (type) {
      case 'Genre':
        return Genre;
      case 'age':
        return age;
      case 'platform':
        return platform;
      default:
        return null;
    }
  }, [type]);

  //onsole.log(TypeChices['ages']);

  const applyFilter = (filterType) => {
    const filterValues = TypeChices[filterType];
    if (filterValues && filterValues.length > 0) {
      return Games.filter((game) => (
        TypeChices[filterType]?.every((chice) =>
          game[filterType]?.includes(chice)
        )
      ));
    } else {
      return Games;
    }
  };

  const filterGame = (gameGenreFiltered,gamePlatformFiltered,gameAgeFiltered)=>
  Games.filter((game)=>
  gameGenreFiltered.includes(game)
  &&gamePlatformFiltered.includes(game)
  &&gameAgeFiltered.includes(game)
  )

  const onPressApply = useMemo(() => {
    return () => {

      let gameGenreFiltered=applyFilter('genres')
      let gamePlatformFiltered=applyFilter('platforms')
      let gameAgeFiltered=applyFilter('ages')
      
      let filter=filterGame(gameGenreFiltered,gamePlatformFiltered,gameAgeFiltered)
        
      setGames([...filter])
      setSortTypeButtonShowsModal(false),
      setSortModalVisible(true),
      setSelectedTypeChices({...TypeChices})
    };
  }, [Games, TypeChices, setSelectedTypeChices, setGames, type]);

  const addingType = (item,type) => {//////////////////////////////////////////////////////////////////////
    if (!TypeChices[type]?.includes(item)) {
      TypeChices[type]?.push(item)
    }else{
      let filteredChices=TypeChices[type].filter((chice)=>chice!==item)
      TypeChices[type]=([...filteredChices]);
    }
  }

  const toggleType = (item) => {

    const typeCallBack = {
      Genre:'genres',
      platform:'platforms',
      age:'ages',
    }
    
    addingType(item,typeCallBack[type])
    setRender(!render)
    
  };

  const closeModal=()=>{
    setSortTypeButtonShowsModal(false), 
    setSortModalVisible(true) 
  }

  const CleanChoises=()=>{ 
    setSelectedTypeChices(noSelectedTypeChices), 
    setTypeChices(noSelectedTypeChices) 
  }

  const RenderChoicses=(item)=>{

    const changeColorOnPress = (item)=>
    (Object.values(TypeChices).flat().includes(item.type)? '#3eb81d' : '#4545');

    return(
      <Pressable style={styles.sortModalContent}>
        <Text style={{ fontSize: 20 }}> {item.type} </Text>
        <TouchableOpacity
          style={styles.sortModalButtonChoice}
          onPress={() => toggleType(item.type)}>
          <View
            style={[
              styles.sortModalButtonChoicePressed,
              {backgroundColor:changeColorOnPress(item),}
              ]} />
        </TouchableOpacity>
      </Pressable>
    )
  }

  return (
    <Pressable style={styles.Screen}
      onPress={() =>closeModal()}>

      <Pressable style={styles.sortModal}>
        <View style={styles.content}>

          <HedMdal 
            closeModal={closeModal} 
            onPressApply={onPressApply} 
            type={type}
          />

          <SectionList
            stickySectionHeadersEnabled
            sections={[
              { hed: 'All games', data: data }]}
            renderSectionHeader={() => <CleanChoisesView CleanChoises={CleanChoises}/>}
            renderItem={({ item }) => RenderChoicses(item)}
          />
        </View>
      </Pressable>

    </Pressable>
  )
}

const styles = StyleSheet.create({

  Screen:{ flex: 1, flexDirection: 'column-reverse', },

  sortModal: {
    flex: 0.5, flexDirection: 'column', borderTopRightRadius: 30,
    borderTopLeftRadius: 30, backgroundColor: '#264348', alignItems: 'center',
    justifyContent: 'center', borderWidth: 2, elevation: 10,
  },
  content: {
    width: '100%', height: '100%',
    flexDirection: 'column', padding: 10
  },
  sortModalContent: {
    width: '100%',
    borderBottomWidth: 1,
    margin: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderStyle: 'dashed'
  },
  sortModalButtonChoice: {
    marginHorizontal: 4,
    padding: 3,
    borderRadius: 100,
    opacity: 0.7,
    backgroundColor: '#586e7b',
    height: globalHW.windowHeight * 0.03, 
    width: globalHW.windowHeight * 0.03,
  },
  sortModalButtonChoicePressed:{
    flex: 1,
    borderRadius: 100,
  },

});


export default SortTypeButtonContent;