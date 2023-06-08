import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import { globalHW } from '../Storge/global';
import TheHeader from './component/TheHeader';
import { log } from 'react-native-reanimated';
import TheButton from './component/TheButton';

const DraggableElement = () => {
  const [render, setrender] = useState(true);
  const [tierListPosition, setTierListPosition] = useState({ x:0, y:0, xLimit:0, yLimit:0});
  console.log(tierListPosition);

  const handleLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log('x:', x, 'y:',y);
    console.log('xLimit:', width, 'yLimit:',height);
    tierListPosition.x=x
    tierListPosition.y=y
    tierListPosition.xLimit=width-50
    tierListPosition.yLimit=height-10
  };

  const RenderTierListView=()=>{
    console.log(tierListPosition.xLimit);
    const Size = {
      width: (tierListPosition.xLimit/6),
    }
    const [containerPosition, setPontainerPosition]=useState([
      {
        name:'A',
        position:{ x:0, y:0},
        st:{
          ...Size,
          backgroundColor:'#da9100',
        }
      },
      {
        name:'B',
        position:{ x:0, y:0},
        st:{
          ...Size,
          backgroundColor:'#006600',
        }
      },
      {
        name:'C',
        position:{ x:0, y:0},
        st:{
          ...Size,
          backgroundColor:'#560319',
        }
      },
    ]);

    const handleLayout = (event,i) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      containerPosition[i].position.x=x
      containerPosition[i].position.y=y
      // console.log('Position:', x, y);
      // console.log('Size:', width, height);
    };

    return(
      <>
        {containerPosition.map((item,i)=>
          <View key={item.name} style={styles.tiers} onLayout={(event)=>handleLayout(event,i)}>
            <View style={[item.st,styles.centerItem]}>
              <Text>{item.name}</Text>
            </View>
            <View style={{flex:1}}></View>
          </View>
        )}
        <RenderDraggableItems/>
      </>
    )
  }

  const RenderDraggableItems =()=>{

    const ScreenEnd=globalHW.windowHeight-globalHW.windowHeight*0.1;
    const Size = {
      width: (tierListPosition.xLimit/6),
      height: (tierListPosition.xLimit/6),
    }
    const [Data, SetData] = useState(
      [
        {
          name:'item1',
          position:{ x: globalHW.windowHeight*0.08, y: ScreenEnd},
          list:{name:'none',place:1},
          st:{
            ...Size,
            backgroundColor:'red'
          },
        },
        {
          name:'item2',
          position:{ x: globalHW.windowHeight*0.08*2+2, y: ScreenEnd },
          list:{name:'none',place:2},
          st:{
            ...Size,
            backgroundColor:'#ffa07a'
          },
        },
        {
          name:'item3',
          position:{ x: globalHW.windowHeight*0.08*3+4, y: ScreenEnd },
          list:{name:'none',place:3},
          st:{
            ...Size,
            backgroundColor:'#fa8072'
          },
        },
        {
          name:'item4',
          position:{ x: globalHW.windowHeight*0.08*4+6, y: ScreenEnd },
          list:{name:'none',place:4},
          st:{
            ...Size,
            backgroundColor:'#ff6347'
          },
        },
        {
          name:'item5',
          position:{ x: globalHW.windowHeight*0.08*5+8, y: ScreenEnd },
          list:{name:'none',place:5},
          st:{
            ...Size,
            backgroundColor:'#8b0000'
          },
        },
        
      ]
    );
    
    const handleDrag = (gestureState,item) => {
    
      const { moveX, moveY } = gestureState;
      item.position={ x: moveX, y: moveY }
      SetData([...Data])
      // setrender
      // SetData(...Data)
      // setPosition({ x: moveX, y: moveY });
      // console.log(moveX);
  
    };

    const onRelease =(item)=>{
      console.log("drop at: x:"+ item.position.x +" y:"+item.position.y)
      var place = Data.indexOf(item)+1;
      console.log('place: '+place);
      var newPlace=Data.length
      const newData=[]
  
      Data.forEach((element) => {
  
        if (element.name!=item.name) {
            if(element.position.x-item.position.x>-7 && element.list.name==item.list.name){//in lift and in same list
              console.log('in lift of '+element.name);
              newPlace=newPlace-1
            }else if (element.position.x-item.position.x<-7 && element.list.name==item.list.name) {//in right and in same list
              console.log('in right of '+element.name);
  
            }
        }
      });// get item new place 
      console.log('newPlace: '+ newPlace);
  
      Data.forEach((element) => {
        if (element.name!=item.name) {
          newData.push(element)
        }
      });
      newData.splice((newPlace-1),0,item)
      //get new sorted data
  
      newData.forEach((element,i) => {
        element.list.place=newData.indexOf(element)+1
      });// get element new places
  
      newData.forEach((element,i) => {
        console.log(element.name+" "+element.list.place);
        element.position.y=ScreenEnd
        element.position.x=(globalHW.windowHeight*0.08+2)*element.list.place
      })// sort elements places
      SetData([...newData])
    }

    return(
      <>
        {Data.map((item)=>
          <Draggable
            key={item.name}
            x={item.position.x}
            y={item.position.y}
            onDrag={(e,gestureState)=>handleDrag(gestureState,item)}
            // onDragRelease={(e,gestureState)=>handleDrag(gestureState,item)}
            onRelease={()=>onRelease(item)}
            renderSize={(tierListPosition.xLimit/6)}
            renderColor="#6f7ddb"
            isCircle
            shouldReverse
        >
          {/* Render your draggable element */}
          <View style={[styles.centerItem,item.st]}><Text>{item.name}</Text></View>
        </Draggable>
        )}
      </>
    )
  }
  
  

  return (
    <View style={styles.ScreenContainer}>
      <TheHeader/>

      <TheButton 
        buttonName={'render'}
        buttonNameStyle={{fontSize: 20,}}
        buttonStyle={{backgroundColor:'#4545',}}
        onPress={()=>setrender(!render)}
      />
      

      <View style={styles.Container}>

        <View onLayout={handleLayout} style={styles.TierListView}>
          <RenderTierListView/>
        </View>

        
      </View>
      <RenderDraggableItems/>
      
      {/* {arr.map((item)=>
        <View key={item} style={{height:globalHW.windowHeight*0.1, borderColor:'blue',borderWidth:2,flexDirection:'row'}}>
          {arr.map((item)=>
          <View key={item} style={{width:globalHW.windowHeight*0.1,height:globalHW.windowHeight*0.1, borderColor:'blue',borderWidth:2}}>
          
          </View>
          )}
        </View>
      )} */}
      

      {/* <View onLayout={handleLayout}
       style={{
         alignSelf:'center',
         height:globalHW.windowHeight*0.1,
         backgroundColor: 'green',
         borderColor:'blue',
         borderWidth:2
        }}>

       </View> */}


      {/* <Draggable
        x={391-50}
        y={ 749-10}
        // onDrag={handleDrag}
        // onRelease={()=>onRelease()}
        renderSize={56}
        renderColor="#6f7ddb"
        isCircle
        shouldReverse
      >
      </Draggable> */}

    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#12171f',
    alignItems:'center',
    justifyContent:'center',
  },
  Container: {
    flex: 1,
    backgroundColor: '#12171f',
    alignItems:'center',
    justifyContent:'center',
  },
  centerItem: {
    alignItems:'center',
    justifyContent:'center',
  },
  TierListView:{
    // flex:1,
    // backgroundColor:'green',
    borderColor:'#fff',
    margin: 10,
    padding:5,
    borderWidth:2,
    borderRadius:10,
  },
  tiers:{
    height: globalHW.windowHeight*0.1,
    width: globalHW.windowWidth*0.9,
    flexDirection:'row',
    borderColor: 'black',
    borderWidth:1,
  },
});

export default DraggableElement;

// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// const gamesData = [
//   { name: 'Mario Kart', genre: ['Racing','Adventure'] },
//   { name: 'Minecraft', genre: ['Adventure'] },
//   { name: 'Fortnite', genre: ['Battle Royale'] },
//   { name: 'FIFA', genre: ['Sports'] },
// ];

// const TryThis = () => {
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [games, setGames] = useState([...gamesData]);

//   console.log('====================================');
//   console.log(selectedGenres);
//   console.log('====================================');

//   const toggleGenreSelection = (genre) => {
//     if (selectedGenres.includes(genre)) {
//       setSelectedGenres(selectedGenres.filter((g) => g !== genre));
//     } else {
//       setSelectedGenres([...selectedGenres, genre]);
//     }
//   };

//   const getFilteredGames = () => {
//     if (!selectedGenres.length) {
//       return gamesData;
//     }
  
//     return gamesData.filter((game) =>
//       selectedGenres.every((g) => game.genre.includes(g))
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={{ marginVertical: 10 }}>
//       <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       <Text>{item.genre}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Racing')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Racing') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Racing</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Adventure')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Adventure') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Adventure</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Battle Royale')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Battle Royale') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Battle Royale</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Sports')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Sports') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Sports</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         onPress={() =>{
//            setGames([...getFilteredGames()])
//           }} // replace with sorting implementation
//         style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
//       >
//         <Text style={{ color: 'white' }}>Done</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={games}
//         keyExtractor={(item) => item.name}
//         renderItem={renderItem}
//         style={{ marginTop: 20 }}
//       />
//     </View>
//   );
// };

// export default TryThis;


// import React, { useState } from 'react';
// import { FlatList, Button, View, Text } from 'react-native';

// const games = [
//   { id: '1', name: 'Mario Kart', genre: 'Racing' },
//   { id: '2', name: 'Fortnite', genre: 'Battle Royale' },
//   { id: '3', name: 'Call of Duty', genre: 'First Person Shooter' }
// ];

// const GenreSelector = ({ selectedGenres, onGenrePress }) => {
//   const genres = ['Racing', 'Battle Royale', 'First Person Shooter'];

//   return (
//     <>
//       {genres.map((genre, i) => (
//         <Button
//           key={`genre-${i}`}
//           onPress={() => onGenrePress(genre)}
//           title={genre}
//           color={selectedGenres.includes(genre) ? 'green' : 'gray'}
//         />
//       ))}
//     </>
//   );
// };

// const GameItem = ({ game }) => {
//   return (
//     <View>
//       <Text>{game.name}</Text>
//     </View>
//   );
// };

// const TryThis = () => {
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const handleGenrePress = (genre) => {
//     if (selectedGenres.includes(genre)) {
//       setSelectedGenres(selectedGenres.filter((g) => g !== genre));
//     } else {
//       setSelectedGenres([...selectedGenres, genre]);
//     }
//   };

//   const filteredGames = selectedGenres.length
//     ? games.filter((game) => selectedGenres.includes(game.genre))
//     : games;

//   return (
//     <>
//       <Button
//         onPress={() => setSelectedGenres([])}
//         title="Clear filters"
//       />

//       <FlatList
//         data={filteredGames}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <GameItem game={item} />
//         )}
//       />

//       <GenreSelector
//         selectedGenres={selectedGenres}
//         onGenrePress={handleGenrePress}
//       />
//     </>
//   );
// };



// export default TryThis;