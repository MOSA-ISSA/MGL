import { useNavigation } from '@react-navigation/native';
import React, { useEffect,useState } from 'react';
import {View,FlatList, ActivityIndicator} from 'react-native';
import GamesCard from './GamesCard';
import { ScreenNames, globalHW } from '../../Storge/global';
import GamesCardServer from './GamesCardServer';

const RenderGameCardRAWG = ({games}) => {
  // console.log();

    const navigation = useNavigation();
    const [data, setData] = useState([]); // Array to hold your data
    const [page, setPage] = useState(1); // Current page number
    const [isLoading, setIsLoading] = useState(false); // Loading state


    const getGamesDataRAWG = async () => {
      try{
        setIsLoading(true);
        //"https://api.rawg.io/api/games?key=7507789e93524533820c1382fd9b7c69&page=1&page_size=40"
        const url = "https://api.rawg.io/api/games?key=7507789e93524533820c1382fd9b7c69&page="+page
        // const Page=page
        return await fetch(url )
        .then(res => res.json())
      }catch(e){
          console.error("e" , e);
      }
    }

    const startToGetGamesFromRAWG =()=>{
      try{
        getGamesDataRAWG().then((res)=>{
          console.log("length",res.results.length);
          setData(res.results)
          setIsLoading(false);
          // setServerGames({...res.games})
        })
      }
      catch(e){
        console.log("its her");
      }
    }

    const RenderItem = ({item}) =>{ 
      return(    
          <GamesCardServer
            item={item} 
            onPress={() => navigation.navigate(ScreenNames.GameDetails, {item})}
            />
    )}

    const getMoreGameFromRAWG = async () => {
      // Set loading state to true
      setIsLoading(true);

      // Increment the page number
      setPage(prevPage => prevPage + 1);

      //add data
      getGamesDataRAWG().then((res)=>{
        console.log("length",res.results.length);
        setData(pre=>[...pre,...res.results])
        setIsLoading(false);
        // setServerGames({...res.games})
      })
    };
    

    useEffect(() => {
      startToGetGamesFromRAWG()
    }, []);

    return (
      <View style={{alignItems:'center'}}>
        <FlatList
          data={data}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={getMoreGameFromRAWG} // Call fetchData when reaching the end of the list
          onEndReachedThreshold={0.1} // Adjust the threshold as needed
          ListFooterComponent={isLoading ? <ActivityIndicator/> : <View style={{backgroundColor:'red' , height:10 , width:'100%'}}/>} // Show a loading indicator at the bottom
          renderItem={({item})=>(
          <RenderItem item={item}/>
          )}
        />
      </View>
    );
}
export default RenderGameCardRAWG;
