import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View,FlatList} from 'react-native';
import { ScreenNames, globalHW } from '../../Storge/global';
import GamesCardServer from './GamesCardServer';

const RenderGameCardServer = ({games}) => {

  const arrGames=Object.values(games)
  console.log(arrGames.length);
  

    const navigation = useNavigation();

    const RenderItem = ({item}) =>{ 
      // console.log(item);
      return(    
          <GamesCardServer
            item={item} 
            onPress={() => navigation.navigate(ScreenNames.GameDetails, {item})}
            />
    )}

    return (
      <View style={{alignItems:'center'}}>
        <FlatList
          data={arrGames}
          numColumns={3}
          // keyExtractor={(item) => item.key}
          renderItem={({item})=>(
          <RenderItem item={item}/>
          )}
        />
      </View>
    );
}
export default RenderGameCardServer;
