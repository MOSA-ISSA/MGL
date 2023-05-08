import React from 'react';
import {View, StyleSheet,} from 'react-native';
import Games from '../../../Storge/GameData';
import TheHeader from '../../component/TheHeader';
import RenderGameCard from '../../component/RenderGameCard';


const TagsScreen = props => {
  console.log('TagsScreen');

    const itemSort = props.route.params?props.route.params:0
    
    const games= Games.filter((game) =>
    itemSort.SortBy.every((type) => 
    game.genres.includes(type)||game.platform.includes(type)||
    game.age.includes(type)||game.Mode.includes(type)||
    game.Developer==(type)||game.Engine==(type)||
    game.Publisher==(type)
    ))
    {/*game.Release.includes(type)*/}

    console.log(itemSort.SortBy);

  return (
      <View style={{flex:1, backgroundColor: '#12171f',}}>

          <TheHeader textHeader={itemSort.SortBy[0]}/>

          <RenderGameCard games={games}/>

      </View>
  );
}

const styles = StyleSheet.create({

  });

export default TagsScreen;