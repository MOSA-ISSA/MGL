import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import GamesCard from './GamesCard';
import { globalHW } from '../../Storge/global';
import AddGametoListButton from './AddGametoListButton';

const RenderGameCard = ({games}) => {

    const navigation = useNavigation();

    const RenderItem = ({item}) => (    
          <GamesCard item={item} onPress={() => navigation.navigate('GameDetails', {item})}>
            <AddGametoListButton 
              buttonStyle={styles.AddOrRemoveButton} 
              item={item}
              buttonNameStyle={{fontSize:15}}
            />
          </GamesCard>
    )

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

const styles = StyleSheet.create({
    AddOrRemoveButton:{
        height: 20,width: 20,
        backgroundColor: '#199',
        borderRadius:20
    },
    center:{ 
        flex:1, 
        justifyContent:'center',
        alignItems: 'center',
    },
    AddDoneAnimation:{
        height:(globalHW.windowWidth*0.5),
        width:(globalHW.windowWidth*0.5), 
        backgroundColor:"#0d697a",
        borderRadius:100,
        borderColor:'black',
        borderWidth:2,
        elevation:5
      },

})

export default RenderGameCard;
