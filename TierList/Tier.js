import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalHW } from '../Storge/global'

const Tier = ({tier,biggerThan,setbiggerThan}) => {
    
    const getbigger=5

    const onLayout=()=>{
        if (Math.floor(tier.list.length/biggerThan)) {
            let newHeight =100*Math.floor(tier.list.length/getbigger+1)
            console.log(tier.name+" "+newHeight);
            tier.height=newHeight
            setbiggerThan(biggerThan+getbigger)
        }
    }

    return (
        <View style={[st.tiers,{height:tier.height}]} onLayout={()=>onLayout()}>
            <View style={[st.centerItem,{backgroundColor:tier.color}]}>
                <Text>{tier.name}</Text>
            </View>
        </View>
    )
}

export default Tier

const st = StyleSheet.create({
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
        borderColor: 'blue',
        borderWidth:1,
    },
    centerItem: {
        flex: 0.1,
        alignItems:'center',
        justifyContent:'center',
      },
})