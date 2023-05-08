import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList, Image, Pressable, } from 'react-native';
import { Genre, age, platform } from '../../Storge/SortChices';
import Games from '../../Storge/GameData';
import { globalHW } from '../../Storge/global';
import TheButton from './TheButton';

const SortTypeButtonContent = (props) => {

  const {
    selectedTypeChices,
    type,
    setSortTypeButtonShowsModal,
    setSortModalVisible,
    setSelectedTypeChices,
    setGames,
    noSelectedTypeChices
  } = props

  console.log(type);

  const [TypeChices, setTypeChices] = useState(noSelectedTypeChices);
  const [render, setRender] = useState(false);
  
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


  const generalGamesFilter = () => {
    return Games.filter((game) => (
      TypeChices.every(
        // (chice) =>a(chice,game) ||
         game.genres.includes(chice) || game.platform.includes(chice)

      )
    ))
  }


  // const ageFilter = () => {
  //   return Games.filter((game) => (
  //     TypeChices.some((chice) => chice[0] == 'age' && chice[1] == (game.age))))
  // }

  const applyGenre =()=>{
    if (!TypeChices.genres.includes(item)) {
      TypeChices.genres.push(item)
    }else{
      let filteredChices=TypeChices.genres.filter((chice)=>chice!==item)
      TypeChices.genres=([...filteredChices]);
    }
    console.log(TypeChices.genres);
    //let filtersGenre = 
  }

  const applyPlatform =()=>{
    //let filtersPlatform = 
  }

  const applyAge =()=>{
    //let filtersAge
  }

  const onPressApply = useMemo(() => {////chek git is it worck
    return () => {
      if (TypeChices.length != 0) {
        console.log(TypeChices);

        let gameFiltered = generalGamesFilter();
        // let gameFilteredAge = ageFilter()
        // let filterResult = [...gameFiltered , ...gameFilteredAge];
        // for (let index = 0; index < gameFiltered.length; index++) {
        //   console.log(gameFiltered[index].gameName);
        // }
        //filterResult = new Set(filterResult); 
        setGames([...gameFiltered])

        // if (gameFilteredAge.length > 0 && gameFiltered.length > 0) {
        //   let gameFilter = gameFiltered.filter(item => gameFilteredAge.includes(item));
        //   setGames([...gameFilter,])
        // }

        // if (gameFilteredAge.length > 0 && gameFiltered.length == 0) {
        //   setGames([...gameFilteredAge,])
        // }

        // if (gameFilteredAge.length == 0 && gameFiltered.length > 0) {
        //   setGames([...gameFiltered,])
        // }
      }
      else {
        setGames([...Games])
        setTypeChices(noSelectedTypeChices)
      }
      setSortTypeButtonShowsModal(false), setSortModalVisible(true), setSelectedTypeChices([...TypeChices])
    };
  }, [Games, TypeChices, setSelectedTypeChices, setGames, type]);

  const addGenre = (item) => {
    if (!TypeChices.genres.includes(item)) {
      TypeChices.genres.push(item)
    }else{
      let filteredChices=TypeChices.genres.filter((chice)=>chice!==item)
      TypeChices.genres=([...filteredChices]);
    }
    console.log(TypeChices.genres);
  }

  const addPlatform = (item) => {
    if (!TypeChices.platforms.includes(item)) {
      TypeChices.platforms.push(item)
    }else{
      let filteredChices=TypeChices.platforms.filter((chice)=>chice!==item)
      TypeChices.platforms=([...filteredChices]);
    }
    console.log(TypeChices.platforms);
  }

  const addAge = (item) => {
    if (!TypeChices.ages.includes(item)) {
      TypeChices.ages.push(item)
    }else{
      let filteredChices=TypeChices.ages.filter((chice)=>chice!==item)
      TypeChices.ages=([...filteredChices]);
    }
    console.log(TypeChices.ages);
  }

  const toggleType = (item) => {

    const typeCallBack = {
      Genre:()=> addGenre(item),
      platform: ()=> addPlatform(item),
      age: ()=>  addAge(item)
    }
    // addGenre(item)
    setRender(!render)
    typeCallBack[type]?.()


    // if (TypeChices.some((chice) => chice[0] == 'age' && chice[1] == (item))) {
    //   setTypeChices(TypeChices.filter((chice) => !(chice[0] == 'age' && chice[1] == (item))))
    // } 
    // if (type != 'age' && !TypeChices.includes(item)) {
    //   setTypeChices([...TypeChices, item])
    // } 
    // if (type == 'age' && !(TypeChices.some((chice) => chice[0] == 'age' && chice[1] == (item)))) {
    //   setTypeChices([...TypeChices, ['age', item]])
    // }
  };

  console.log(Object.values(TypeChices).flat().includes('E'));


  return (
    <Pressable style={{ flex: 1, flexDirection: 'column-reverse', }}
      onPress={() => { setSortTypeButtonShowsModal(false), setSortModalVisible(true) }}>
      <Pressable style={styles.sortModal}>

        <View style={styles.content}>

          <View style={styles.sortModalContent} >

            <TouchableOpacity onPress={() => { setSortTypeButtonShowsModal(false), setSortModalVisible(true) }}>
              <Text style={{ fontSize: 30 }}> {'<'} </Text>
            </TouchableOpacity>
            <Text style={styles.title}>{type} :</Text>

            <TheButton buttonName={"Apply"} buttonStyle={styles.ApplyButtonStyle}
              buttonNameStyle={{ fontSize: 20, }}
              onPress={() => onPressApply()}
            />

          </View>

          <SectionList
            sections={[
              { hed: 'All games', data: data }]}
            renderSectionHeader={({ section }) => (
              <TouchableOpacity onPress={() => { setSelectedTypeChices(noSelectedTypeChices), setTypeChices(noSelectedTypeChices) }}>
                <Text>Clear</Text>
              </TouchableOpacity>
            )}
            renderItem={({ item }) => (

              <Pressable style={styles.sortModalContent}>
                <Text style={{ fontSize: 20 }}> {item.type} </Text>
                <TouchableOpacity
                  style={
                    [styles.sortModalButtonChoice,
                    { height: globalHW.windowHeight * 0.03, width: globalHW.windowHeight * 0.03, },
                    ]}
                  onPress={() => toggleType(item.type)}>
                  <View
                    style={{
                      flex: 1, borderRadius: 100,
                      backgroundColor:Object.values(TypeChices).flat().includes(item.type)? '#3eb81d' : '#4545',
                    }} />
                </TouchableOpacity>
              </Pressable>

            )}
          />
        </View>

      </Pressable>
    </Pressable>
  )
}

const styles = StyleSheet.create({

  sortModal: {
    flex: 0.5, flexDirection: 'column', borderTopRightRadius: 30,
    borderTopLeftRadius: 30, backgroundColor: '#264348', alignItems: 'center',
    justifyContent: 'center', borderWidth: 2, elevation: 10,
  },

  title: { fontSize: 30, fontWeight: '700', paddingBottom: 3 },

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
  ApplyButtonStyle: {
    backgroundColor: '#4545',
    height: 40, width: 60,
    borderRadius: 10
  },
  sortModalButtonChoice: {
    marginHorizontal: 4,
    padding: 3,
    borderRadius: 10,
    opacity: 0.7,
    backgroundColor: '#586e7b'
  },

});


export default SortTypeButtonContent;