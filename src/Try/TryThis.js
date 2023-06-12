import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import { globalHW } from '../Storge/global';
import TheHeader from './component/TheHeader';
import TheButton from './component/TheButton';

const DraggableElement = () => {
  const [render, setrender] = useState(true);
  const [ContainertierListPosition, setContainertierListPosition] = useState
  (
    { x:0, y:0, xLimit:0, yLimit:0, tier:0, width:0, height: 0,}
  );
  const [tierListPosition, setTierListPosition] = useState(
    {
      A:{ x:0, y:0, xLimit:0, yLimit:0},
      B:{ x:0, y:0, xLimit:0, yLimit:0},
      C:{ x:0, y:0, xLimit:0, yLimit:0},
      D:{ x:0, y:0, xLimit:0, yLimit:0},
    }
  );
  const DraggableSize=(ContainertierListPosition.xLimit/6)


  const handleLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    console.log('x:', x, 'y:',y);
    console.log('xLimit:', width, 'yLimit:',height);
    ContainertierListPosition.x=x
    ContainertierListPosition.y=y
    ContainertierListPosition.xLimit=x+width
    ContainertierListPosition.yLimit=y+height
    ContainertierListPosition.height=height,
    ContainertierListPosition.width=width
  };

  const RenderTierListView=()=>{
    // console.log(ContainertierListPosition.xLimit);
    const Size = {
      width: (DraggableSize),
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
      {
        name:'D',
        position:{ x:0, y:0},
        st:{
          ...Size,
          backgroundColor:'#560319',
        }
      },
    ]);
    console.log(containerPosition[0].position);

    const [p, setp] = useState({x:0,y:0});

    const handleLayout = (event,i) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      console.log(y);
      containerPosition[i].position.x=x
      containerPosition[i].position.y=y

      // let yLimit=height+ContainertierListPosition.y
      // let xLimit=x+ContainertierListPosition.xLimit
      // tierListPosition[containerPosition[i].name].x=x
      // tierListPosition[containerPosition[i].name].xLimit=xLimit
      // tierListPosition[containerPosition[i].name].yLimit=yLimit
      // tierListPosition[containerPosition[i].name].y=y

      // console.log('y',height);
    };

    const handleDrag =(e,position)=>{
      const { moveX, moveY } = position;
        y=moveY-ContainertierListPosition.y-28//28 raduce size
        x=moveX-ContainertierListPosition.x-28
      setp({ x:x, y:y })
    }

    return(
      <View>
        {containerPosition.map((item,i)=>
          <View key={item.name} style={styles.tiers} onLayout={(event)=>handleLayout(event,i)}>
            <View style={[item.st,styles.centerItem]}>
              <Text>{item.name}</Text>
            </View>
            <View style={{flex:1}}></View>
          </View>
        )}
        <RenderDraggableItems2/>
          {/* <Draggable
            x={p.x}
            y={p.y}
            onDrag={handleDrag}
            // onRelease={()=>onRelease()}
            renderSize={56}
            renderColor="#6f7ddb"
            isCircle
            shouldReverse
          >
        </Draggable> */}
      </View>
    )
  }

  const RenderDraggableItems =()=>{

    const screenEnd=ContainertierListPosition.yLimit
    const noneList=ContainertierListPosition.yLimit+10
    const Size = {
      width: (DraggableSize),
      height: (DraggableSize),
    }
    const [Data, SetData] = useState(
      [
        {
          name:'item1',
          position:{ x: globalHW.windowHeight*0.08, y: noneList},
          list:{name:'none',place:1},
          st:{
            ...Size,
            backgroundColor:'red'
          },
        },
        {
          name:'item2',
          position:{ x: globalHW.windowHeight*0.08*2+2, y: noneList },
          list:{name:'none',place:2},
          st:{
            ...Size,
            backgroundColor:'#ffa07a'
          },
        },
        {
          name:'item3',
          position:{ x: globalHW.windowHeight*0.08*3+4, y: noneList },
          list:{name:'none',place:3},
          st:{
            ...Size,
            backgroundColor:'#fa8072'
          },
        },
        {
          name:'item4',
          position:{ x: globalHW.windowHeight*0.08*4+6, y: noneList },
          list:{name:'none',place:4},
          st:{
            ...Size,
            backgroundColor:'#ff6347'
          },
        },
        {
          name:'item5',
          position:{ x: globalHW.windowHeight*0.08*5+8, y: noneList },
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
      item.position={ x: moveX-(DraggableSize)/2, y: moveY-(DraggableSize)/2 }
      SetData([...Data])
      // setrender
      // SetData(...Data)
      // setPosition({ x: moveX, y: moveY });
      // console.log(moveX);
  
    };

    const onRelease =(item)=>{
      if (item.position.y>screenEnd-10) {
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
        element.position.y=noneList
        element.position.x=(globalHW.windowHeight*0.08+2)*element.list.place
      })// sort elements places
      SetData([...newData])
      }
      
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
            renderSize={(DraggableSize)}
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

  const RenderDraggableItems2 =()=>{

    const screenEnd=ContainertierListPosition.height-10
    const noneList=ContainertierListPosition.height
    const Size = {
      width: (DraggableSize),
      height: (DraggableSize),
    }
    const position={x:0,y:noneList}
    const [Data, SetData] = useState(
      [
        {
          name:'item1',
          position:{ x: position.x, y: noneList},
          list:{name:'none',place:1},
          st:{
            ...Size,
            backgroundColor:'red'
          },
        },
        {
          name:'item2',
          position:{ x:DraggableSize+2, y: noneList },
          list:{name:'none',place:2},
          st:{
            ...Size,
            backgroundColor:'#ffa07a'
          },
        },
        {
          name:'item3',
          position:{ x: DraggableSize*2+4, y: noneList },
          list:{name:'none',place:3},
          st:{
            ...Size,
            backgroundColor:'#fa8072'
          },
        },
        {
          name:'item4',
          position:{ x: DraggableSize*3+6, y: noneList },
          list:{name:'none',place:4},
          st:{
            ...Size,
            backgroundColor:'#ff6347'
          },
        },
        {
          name:'item5',
          position:{ x: DraggableSize*4+8, y: noneList },
          list:{name:'none',place:5},
          st:{
            ...Size,
            backgroundColor:'#8b0000'
          },
        },
        
      ]
    );
    const [selecteData, SetselecteData]=useState(
      [
        {none:[
            {
              name:'item1',
              position:{ x: position.x, y: noneList},
              list:{name:'none',place:1},
              st:{
                ...Size,
                backgroundColor:'red'
              },
            },
            {
              name:'item2',
              position:{ x:DraggableSize+2, y: noneList },
              list:{name:'none',place:2},
              st:{
                ...Size,
                backgroundColor:'#ffa07a'
              },
            },
            {
              name:'item3',
              position:{ x: DraggableSize*2+4, y: noneList },
              list:{name:'none',place:3},
              st:{
                ...Size,
                backgroundColor:'#fa8072'
              },
            },
            {
              name:'item4',
              position:{ x: DraggableSize*3+6, y: noneList },
              list:{name:'none',place:4},
              st:{
                ...Size,
                backgroundColor:'#ff6347'
              },
            },
            {
              name:'item5',
              position:{ x: DraggableSize*4+8, y: noneList },
              list:{name:'none',place:5},
              st:{
                ...Size,
                backgroundColor:'#8b0000'
              },
            },
        ]
      },
        {A:[{}]},
        {B:[{}]},
        {C:[{}]},
        {D:[{}]},
      ]
    );
    
    const handleDrag = (gestureState,item) => {

      const { moveX, moveY } = gestureState;
      y=moveY-ContainertierListPosition.y-DraggableSize/2 //raduce size
      x=moveX-ContainertierListPosition.x-DraggableSize/2
      item.position={ x: x, y: y }
      SetData([...Data])
    };

    const getItemNewPlace =(item)=>{
      var newPlace=Data.length
      Data.forEach((element) => {
          if (item.position.y>screenEnd-10) {
            if (element.name!=item.name) {
                if(element.position.x-item.position.x>-7 && element.list.name==item.list.name){//in lift and in same list
                  console.log('in lift of '+element.name);
                  newPlace=newPlace-1
                }else if (element.position.x-item.position.x<-7 && element.list.name==item.list.name) {//in right and in same list
                  console.log('in right of '+element.name);
                }
            }
        }else{
          item.position.y=0
          newPlace=0
        }
      });// get item new place 
      return newPlace
    };

    const getNewSortedData =(item,newPlace)=>{
      const newData=[]
      Data.forEach((element) => {
        if (element.name!=item.name) {
          newData.push(element)
        }
      });
      newData.splice((newPlace-1),0,item)
      return(newData);
    };

    const giveElementNewPlaces=(newData)=>{
      newData.forEach((element,i) => {
        if (true) {
          element.list.place=newData.indexOf(element)+1
        }
      });
    }

    const setTier=(item)=>{

    }

    const onRelease =(item)=>{
      console.log("2")
        // console.log("drop at: x:"+ item.position.x +" y:"+item.position.y)
      var newPlace=getItemNewPlace(item)
      const newData=getNewSortedData(item,newPlace);
      giveElementNewPlaces(newData)
      // sort elements places
      if (item.position.y>screenEnd-10) {
      newData.forEach((element,i) => {
        console.log(element.name+" "+element.list.place);
        element.position.y=noneList
        element.position.x=(DraggableSize*i)+2*i
      })}
      if (item.position.y>0&&item.position.y<81) {
        item.position.y=ContainertierListPosition.y*0.04
        item.position.x=DraggableSize+4
      }

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
            onDragRelease={()=>{console.log("1");}}
            onRelease={()=>onRelease(item)}
            renderSize={(DraggableSize)}
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
      {/* <TheHeader/>

      <TheButton 
        buttonName={'render'}
        buttonNameStyle={{fontSize: 20,}}
        buttonStyle={{backgroundColor:'#4545',}}
        onPress={()=>setrender(!render)}
      /> */}
      

      <View style={styles.Container}>

        <View onLayout={handleLayout} style={styles.TierListView}>
          <RenderTierListView/>
        </View>

        
      </View>
      {/* <RenderDraggableItems/> */}
      {/* <Draggable
        x={ContainertierListPosition.x}
        y={ContainertierListPosition.y+244}
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