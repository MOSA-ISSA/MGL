import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalHW } from '../Storge/global'
import Tier from './Tier'
import { getAllGames } from '../src/res/API'
import Draggable from 'react-native-draggable'

const TryV2 = () => {
    console.log('TryV2--');

    const tierHeightInit=100

    const tierListInit = [
        {
            ID:1,
            name:'A',
            color:'#006400',
            list:[],
            height:tierHeightInit,
            Y:100,
            X:10,
        },
        {
            ID:2,
            name:'b',
            color:'#efcc00',
            list:[],
            height:tierHeightInit,
            Y:200,
            X:10,
        },
        {
            ID:3,
            name:'c',
            color:'#8a0f0f',
            list:[],
            height:tierHeightInit,
            Y:300,
            X:10,
        },
    ]

    // const [itemsList,setItemsList]=useState(items)
    const [tierList,setTierList]=useState(tierListInit)
    const [biggerThan,setbiggerThan]=useState(5)
    const [position, setPosition] = useState({ x: 0, y: 0,});
    // const [tier,setTier]=useState([])

    const RenderTiers =()=>(
        tierList.map((tier)=>
            <Tier key={tier.ID} tier={tier} biggerThan={biggerThan} setbiggerThan={setbiggerThan}/>
        )
    )

    const RenderDraggableItems =()=>{
        const size=50

        const DraggableItemsINIT = ['a', 'b', 'c', 'd', 'e', 'f'];

        const [DraggableItems,setDraggableItems]= useState(
            DraggableItemsINIT.map((name, index) => ({
            name,
            ID: index + 1,
            position: { x: (index + 1)*size+5, y: 20 },
        })));

        useEffect(() => {
           console.log("its *********************");
        }, []);

        const onDrag =(gestureState,item)=>{
            const { moveX, moveY } = gestureState;
            item.position={x:moveX-25, y:moveY-25}
            setDraggableItems([...DraggableItems])
            // console.log('position:', moveX, moveY);
        }

        const onDragRelease =(gestureState,item)=>{
        
            tierList.forEach(tier => {
                // console.log(position.y+25+"   "+tier.Y);
                if ((item.position.y+25)>tier.Y && (item.position.y+25-tier.Y)<tier.height) {
                    // console.log("item position in " +tier.name);
                    item.position={x:item.position.x, y:tier.Y+25}
                    tier.list.push(item)///item
                    setDraggableItems([...DraggableItems])
                }
            })
    
            if ((item.position.y+25)>tierList[tierList.length-1].Y+tierList[tierList.length-1].height) {
                setDraggableItems(
                    DraggableItemsINIT.map((name, index) => ({
                    name,
                    ID: index + 1,
                    position: { x: (index + 1)*size+5, y: 20 },
                })))
            }
        }

        return(
            <>
              {DraggableItems.map((item)=>
                <Draggable
                  key={item.ID}
                  x={item.position.x}
                  y={item.position.y}
                  renderSize={50}
                  renderColor="#6f7ddb"
                  isCircle
                  renderText={item.name}
                  onDrag={(e,gestureState)=>onDrag(gestureState,item)}
                  onDragRelease={(e,gestureState)=>{onDragRelease(gestureState,item)}}
                //   onRelease={()=>onRelease(item)}
                //   onShortPressRelease={()=>{
                //     itemSize[item.name].height=10
                //   }}
              />
              )}
            </>
          )
        }

    const onDragRelease =(gestureState)=>{
        
        tierList.forEach(tier => {
            // console.log(position.y+25+"   "+tier.Y);
            if ((position.y+25)>tier.Y && (position.y+25-tier.Y)<tier.height) {
                // console.log("item position in " +tier.name);
                setPosition({x:50,y:tier.Y+25})
                tier.list.push(1)///item
            }
        })

        if ((position.y+25)>tierList[tierList.length-1].Y+tierList[tierList.length-1].height) {
            setPosition({x:0,y:0})
        }
    }
    const onDrag =(gestureState)=>{
        const { moveX, moveY } = gestureState;
        setPosition({x:moveX-25, y:moveY-25})
        // console.log('position:', moveX, moveY);
    }

    return (
        <ScrollView style={st.ScreenContainer}>
            
            <Button title='+' 
            onPress={()=>{
                tierList[0].list.push(tierList[0].list.length+1)
                setTierList([...tierList])
                // itemsList.list.push(itemsList.list.length+1)
                // setItemsList({...itemsList})
            }}/>
            <Button title='-' 
            onPress={()=>{
                // 1 find index
                // array.splice(indexToRemove, 1);
                tierList[0].list.splice(tierList[0].list.length-1,1)
                setTierList([...tierList])
            }}/>
            <Button title='rest' 
            onPress={()=>{
                // console.log('h');
                tierList[0].list=[]
                setTierList([...tierList])
            }}/>

            <RenderTiers/>
            <RenderDraggableItems/>
            
            
            


            <Draggable
                x={position.x}
                y={position.y}
                isCircle
                renderSize={50}
                renderColor='green'
                onDragRelease={(e,gestureState)=>{onDragRelease(gestureState)}}
                onDrag={(e,gestureState)=>{onDrag(gestureState)}}
            />
            

            <View style={{height:globalHW.windowHeight/2,}}></View>

        </ScrollView>
    )
}

export default TryV2

const st = StyleSheet.create({
    ScreenContainer: {
      flex: 1,
      backgroundColor: '#12171f',
    //   alignItems:'center',
    //   justifyContent:'center',
    },
    TierListView:{
        width:'95%',
        borderColor:'#fff',
        margin: 10,
        padding:5,
        borderWidth:2,
        borderRadius:10,
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
  });
  
  // setTimeout(() => {
        //     console.log("time out finish");
        //   }, 10*1000);