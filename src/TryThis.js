import React, {useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Draggable from 'react-native-draggable';
import { globalHW } from '../Storge/global';

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
    const [tiersSize,setTiersSize]=useState({})
      tierContainer.forEach((item)=>{
        tiersSize[item.name]={...Size}
      })
      // console.log(tiersSize.A.height=tiersSize.A.height*2);

      // const changeTiersSize=(list)=>{
      //   var xLimit=ContainertierListPosition.xLimit-DraggableSize
      //   // console.log(list);
      //   for (const element of list) {
      //     if (element.position.x>xLimit) {
      //       if (element.list.name!='none') {
      //         console.log('its out of xLimit');
      //         element.position.y=element.position.y+DraggableSize+DraggableSize*0.2
      //     }
      //       break
      //     }
      //   }
      // }
      
    return(
      <View>
        {tierContainer.map((item,i)=>
          <View key={item.name} style={styles.tiers} onLayout={(event)=>handleLayout(event,i,true)}>
            <View style={[item.st,styles.centerItem,tiersSize[item.name]]}>
              <Text>{item.name}</Text>
            </View>
          </View>
        )}
        <RenderDraggableItems/>
      </View>
    )
  }

  const RenderDraggableItems =()=>{

    var tiersPosition={};
      tierContainer.forEach((item)=>{
        tiersPosition[item.name]=item.position.y
      })
    // console.log(tiersPosition);

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
            // ...Size,
            backgroundColor:'red'
          },
        },
        {
          name:'item2',
          position:{ x:DraggableSize+2, y: noneList },
          list:{name:'none',place:2},
          st:{
            // ...Size,
            backgroundColor:'#ffa07a'
          },
        },
        {
          name:'item3',
          position:{ x: DraggableSize*2+4, y: noneList },
          list:{name:'none',place:3},
          st:{
            // ...Size,
            backgroundColor:'#fa8072'
          },
        },
        {
          name:'item4',
          position:{ x: DraggableSize*3+6, y: noneList },
          list:{name:'none',place:4},
          st:{
            // ...Size,
            backgroundColor:'#ff6347'
          },
        },
        {
          name:'item5',
          position:{ x: DraggableSize*4+8, y: noneList },
          list:{name:'none',place:5},
          st:{
            // ...Size,
            backgroundColor:'#8b0000'
          },
        },
        
      ]
    );
    var [itemSize,setItemSize]=useState({});
      Data.forEach((item)=>{
        itemSize[item.name]={...Size}
      })
    // console.log(itemSize);

    
    const handleDrag = (gestureState,item) => {
      const { moveX, moveY } = gestureState;
      y=moveY-ContainertierListPosition.y-DraggableSize/2 //raduce size
      tiersPosition=moveX-ContainertierListPosition.x-DraggableSize/2
      item.position={ x: tiersPosition, y: y }
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

    const changeTiersSize=(list)=>{
      var xLimit=ContainertierListPosition.xLimit-DraggableSize
      // console.log(list);
      for (const element of list) {
        if (element.position.x>DraggableSize) {//xLimit
          if (element.list.name!='none') {
            console.log('its out of xLimit');
            itemSize[element.name].height=0
            itemSize[element.name].width=0
            console.log(itemSize[element.name]);
            setItemSize({...itemSize})
            // element.position.y=element.position.y+DraggableSize+DraggableSize*0.2
            // element.st.height=20
            // element.st.width=20
          break
          }
        }
      }
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
      tiers.forEach((tier,i)=>{
        changeTiersSize(tier.list)
      })
      SetData([...newData.Data])    
    }

    const onDragRelease=(item)=>{
      console.log('onDragRelease');
      // const { moveX, moveY } = gestureState;
        if (item.position.y>-DraggableSize/2 && item.position.y<tiersPosition.B-DraggableSize/2) {
          item.position.y=tiersPosition.B*0.1
          item.list.name='A'
        }
        else if (item.position.y>tiersPosition.B-DraggableSize/2 && item.position.y<tiersPosition.C-DraggableSize/2) {
          item.position.y=tiersPosition.B+tiersPosition.B*0.1
          item.list.name='B'
        }
        else if (item.position.y>tiersPosition.C-DraggableSize/2 && item.position.y<tiersPosition.D-DraggableSize/2) {
          item.position.y=tiersPosition.C+tiersPosition.B*0.1
          item.list.name='C'
        }
        else if (item.position.y>tiersPosition.D-DraggableSize/2 && item.position.y<screenEnd-DraggableSize/2) {
          item.position.y=tiersPosition.D+tiersPosition.B*0.1
          item.list.name='D'
        }
        else{
          item.position.y=screenEnd+10
          item.list.name='none'
        }     
    }/*************************aoutomtic**************************/

    return(
      <>
        {Data.map((item)=>
          <Draggable
            key={item.name}
            x={item.position.x}
            y={item.position.y}
            z={0}
            onDrag={(e,gestureState)=>handleDrag(gestureState,item)}
            onDragRelease={(e,gestureState)=>{onDragRelease(item)}}
            onRelease={()=>onRelease(item)}
            // onShortPressRelease={()=>{
            //   itemSize[item.name].height=10
            // }}
            renderSize={(itemSize.item1.height)}
            renderColor="#6f7ddb"
            isCircle
            shouldReverse
        >
          <View style={[styles.centerItem,item.st,itemSize[item.name]]}><Text>{item.name}</Text></View>
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
    borderColor:'#fff',
    margin: 10,
    padding:5,
    borderWidth:2,
    borderRadius:10,
  },
  tiers:{
    width: globalHW.windowWidth*0.9,
    flexDirection:'row',
    borderColor: 'black',
    borderWidth:1,
  },
});

export default DraggableElement;