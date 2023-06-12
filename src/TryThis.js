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

  const [tierContainer, setTierContainer]=useState([
    {
      name:'A',
      position:{ x:0, y:0},
      st:{
        backgroundColor:'#da9100',
      }
    },
    {
      name:'B',
      position:{ x:0, y:0},
      st:{
        backgroundColor:'#006600',
      }
    },
    {
      name:'C',
      position:{ x:0, y:0},
      st:{
        backgroundColor:'#560319',
      }
    },
    {
      name:'D',
      position:{ x:0, y:0},
      st:{
        backgroundColor:'#560319',
      }
    },
  ]);

  const DraggableSize=(ContainertierListPosition.xLimit/6)

  const handleLayout = (event,i,is) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    if (is) {
      tierContainer[i].position.y=y
    }else{
      console.info('ContainertierListPosition');
      console.log('x:', x, 'y:',y);
      console.log('xLimit:', width, 'yLimit:',height);
      ContainertierListPosition.x=x
      ContainertierListPosition.y=y
      ContainertierListPosition.xLimit=x+width
      ContainertierListPosition.yLimit=y+height
      ContainertierListPosition.height=height,
      ContainertierListPosition.width=width
    }
  };

  const RenderTierListView=()=>{

    const Size = {
      width: (DraggableSize),
      height: (DraggableSize)+DraggableSize*0.2,
    }

    // const [p, setp] = useState({x:0,y:0});

    // const handleDrag =(e,position)=>{
    //   const { moveX, moveY } = position;
    //     y=moveY-ContainertierListPosition.y-28//28 raduce size
    //     x=moveX-ContainertierListPosition.x-28
    //   setp({ x:x, y:y })
    // }//try Draggable

    return(
      <View>
        {tierContainer.map((item,i)=>
          <View key={item.name} style={styles.tiers} onLayout={(event)=>handleLayout(event,i,true)}>
            <View style={[item.st,styles.centerItem,{...Size,}]}>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
        <RenderDraggableItems/>

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
    // console.log('y',tierListPosition[1].y);
    // tierListPosition.forEach((item)=>{
    //   console.log('y',item.y);
    // })
    var tiersP={};
      tierContainer.forEach((item)=>{
        tiersP[item.name]=item.position.y
      })
    const screenEnd=ContainertierListPosition.height-10
    const noneList=ContainertierListPosition.height
    
    
    // console.log('tiersP');
    // console.log(tiersP);


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
    
    const handleDrag = (gestureState,item) => {
      const { moveX, moveY } = gestureState;
      y=moveY-ContainertierListPosition.y-DraggableSize/2 //raduce size
      tiersP=moveX-ContainertierListPosition.x-DraggableSize/2
      item.position={ x: tiersP, y: y }
      SetData([...Data])
    };

     const getItemNewPlace =(item,list)=>{
      var newPlace=list.length
      list.forEach((element) => {
          if (element.list.name==item.list.name) {
            if (element.name!=item.name) {
                if(element.position.x-item.position.x>-7 && element.list.name==item.list.name){//in lift and in same list
                  console.log('in lift of '+element.name);
                  newPlace=newPlace-1
                }else if (element.position.x-item.position.x<-7 && element.list.name==item.list.name) {//in right and in same list
                  console.log('in right of '+element.name);
                }else if (element.list.name){
                  // newPlace=newPlace-1
                }
            }
            
          }
      }); 
      return newPlace
    }

    const getNewSortedData =(item)=>{
      const newData=[]
      const tiers=[{name:"none",list:[]},{name:"A",list:[]},{name:"B",list:[]},{name:"C",list:[]},{name:"D",list:[]}]
      for (let i = 0; i < tiers.length; i++) {
        Data.forEach((element) => {
        if (element.list.name==tiers[i].name) {
            if (element.name!=item.name) {
              tiers[i].list.push(element)
            }
          }
        });
      }
      tiers.forEach((tier)=>{
        if (item.list.name==tier.name) {
          tier.list.splice((getItemNewPlace(item,tier.list)),0,item)
        }
        newData.push(...tier.list)
      })

      return({Data:newData,tiers:tiers});
    };// 90%

    const giveElementNewPlaces=(newData)=>{
      
      newData.forEach((element,i) => {
          element.list.place=newData.indexOf(element)+1
      });
    }

    const onRelease =(item)=>{
      console.log("onRelease")
      const newData=getNewSortedData(item);
      giveElementNewPlaces(newData.Data)
      // sort elements places
      var tiers=newData.tiers
      tiers.forEach((tier,i)=>{
        tier.list.forEach((element,)=>{
          var place=tier.list.indexOf(element)
          if (element.list.name==tiers[i].name){/*same list*/ 
              element.position.x=tiers[i].name=='none'?
              (DraggableSize*place)+2*place:
              !place?DraggableSize+2:
              DraggableSize*(place+1)+2*(place+1)
              
          }
        })
      })
      SetData([...newData.Data])    
    }

    const onDragRelease=(item)=>{
      console.log('onDragRelease');
      // const { moveX, moveY } = gestureState;
        if (item.position.y>-DraggableSize/2 && item.position.y<tiersP.B-DraggableSize/2) {
          item.position.y=tiersP.B*0.1
          item.list.name='A'
        }
        else if (item.position.y>tiersP.B-DraggableSize/2 && item.position.y<tiersP.C-DraggableSize/2) {
          item.position.y=tiersP.B+tiersP.B*0.1
          item.list.name='B'
        }
        else if (item.position.y>tiersP.C-DraggableSize/2 && item.position.y<tiersP.D-DraggableSize/2) {
          item.position.y=tiersP.C+tiersP.B*0.1
          item.list.name='C'
        }
        else if (item.position.y>tiersP.D-DraggableSize/2 && item.position.y<screenEnd-DraggableSize/2) {
          item.position.y=tiersP.D+tiersP.B*0.1
          item.list.name='D'
        }
        else{
          item.position.y=screenEnd+10
          item.list.name='none'
        }     
    }/*************************************************************/

    {/* check if ist out
    console.log(ContainertierListPosition.xLimit);
      console.log(item.position.x);
      if (item.position.x+DraggableSize>ContainertierListPosition.xLimit) {
        console.error('out');
      }
   */}

    return(
      <>
        {Data.map((item)=>
          <Draggable
            key={item.name}
            x={item.position.x}
            y={item.position.y}
            onDrag={(e,gestureState)=>handleDrag(gestureState,item)}
            onDragRelease={(e,gestureState)=>{onDragRelease(item)
            // console.log(gestureState);
            }}
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

      <View style={styles.Container}>
        <View onLayout={handleLayout} style={styles.TierListView}>
          <RenderTierListView/>
        </View>
      </View>


      {/* <TheHeader/>

      <TheButton 
        buttonName={'render'}
        buttonNameStyle={{fontSize: 20,}}
        buttonStyle={{backgroundColor:'#4545',}}
        onPress={()=>setrender(!render)}
      /> */}
      

      
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
    // height: globalHW.windowHeight*0.1,
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