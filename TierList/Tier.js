import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { globalHW } from '../Storge/global'

const Tier = ({tier,biggerThan,setbiggerThan}) => {
    console.log('Tier');
    
    // const [TierCopy,setTierCopy]=useState({...tier})
    const getbigger=5

    const onLayout=(event)=>{
        const { x, y, width, height } = event.nativeEvent.layout;
        getPosition(x,y)
        handleSizetier()
    }

    const handleSizetier =()=>{
        // console.log(tier.list.length);
        // console.log("tier height: ",tier.height);

        let newHeight =100*Math.floor(tier.list.length/getbigger+1)//100 change later 
        // console.log(tier.name+" "+newHeight);

        if (Math.floor(tier.list.length/biggerThan)) {
            // console.log('getbigger');
            tier.height=newHeight
            setbiggerThan(biggerThan+getbigger)
        }
        else if (tier.height>newHeight) {
            tier.height=newHeight
            setbiggerThan(biggerThan-getbigger)
        } 
    }
    const getPosition=(x,y)=>{
        // console.log(x,'x', y,'y');
        tier.Y=y
        tier.X=x
        // console.log('tier y: '+ tier.Y);
    }

    return (
        <View style={[st.tiers,{height:tier.height}]} onLayout={(event)=>onLayout(event)}>
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
        width: '95%',
        flexDirection:'row',
        borderColor: '#fff',
        borderWidth:1,
        alignSelf:'center'
    },
    centerItem: {
        flex: 0.1,
        alignItems:'center',
        justifyContent:'center',
      },
})