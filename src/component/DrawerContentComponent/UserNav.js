import React, { useContext } from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import { ScreenNames, globalHW } from '../../../Storge/global';
import TheContext from '../../../Storge/thisContext';

const UserNav = ({navigate}) => {

    const {User} = useContext(TheContext)
    const imgID=`data:${User.image};base64,${User.image}`

    return (
        <TouchableOpacity onPress={()=>{navigate(ScreenNames.Loading)}}>
              
            {/*User Image*/}
            <View style={styles.UserImage}>
                <View style={styles.userNav}>
                    <Image
                    source={{uri: imgID}}
                    style={styles.img}/>
                </View>
            </View>

            {/*User name*/}
            <View style={styles.UserName}>
                <Text style={styles.userName}> {User.name?User.name:'log in'} </Text>
            </View>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    userNav: {height:"100%", width:'100%', backgroundColor:'black',borderRadius:100},
    img:{height: '100%', width: '100%', borderRadius:100, borderWidth:2, borderColor:'black'},
    userName: {fontSize: globalHW.windowHeight*0.038, color:'black', fontWeight: '600',},//
    UserImage:{height:'70%',width: '65%',alignSelf:'center'},
    UserName:{height:'30%',width: '100%',alignItems:'center'}
})

export default UserNav;
