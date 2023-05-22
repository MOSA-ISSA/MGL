import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View,FlatList} from 'react-native';
import GamesCard from './GamesCard';
import { ScreenNames, globalHW } from '../../Storge/global';

const RenderGameCard = ({games,needToRender}) => {

    const navigation = useNavigation();

    const RenderItem = ({item}) =>{ 
      return(    
          <GamesCard 
            item={item} 
            onPress={() => navigation.navigate(ScreenNames.GameDetails, {item})}
            needToRender={needToRender}
            />
    )}

    return (
      <View style={{alignItems:'center'}}>
        <FlatList
          data={games}
          numColumns={3}
          keyExtractor={(item) => item.key}
          renderItem={({item})=>(
          <RenderItem item={item}/>
          )}
        />
      </View>
    );
}
export default RenderGameCard;
