import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalHW } from '../Storge/global'
import Tier from './Tier'

const TryV2 = () => {
    console.log('TryV2');
    const [tierList,setTierList]=useState([
        {
            ID:1,
            name:'A',
            color:'#006400',
            list:[],
            height:100
        },
        {
            ID:2,
            name:'b',
            color:'#efcc00',
            list:[],
            height:100
        },
    ])
    const [biggerThan,setbiggerThan]=useState(5)
    // const [tier,setTier]=useState([])

    const RenderTiers =()=>(
        tierList.map((tier)=>
            <Tier key={tier.ID} tier={tier} biggerThan={biggerThan} setbiggerThan={setbiggerThan}/>
        )
    )

    return (
        <View style={st.ScreenContainer}>
            
            <Button title='+' 
            onPress={()=>{
                tierList[0].list.push(tierList[0].list.length+1)
                setTierList([...tierList])
                }}/>
            <Button title='-' 
            onPress={()=>{
                tierList[0].list=[]
                setTierList([...tierList])
                }}/>

            <View style={st.TierListView}>
                <RenderTiers/>
            </View>

        </View>
    )
}

export default TryV2

const st = StyleSheet.create({
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