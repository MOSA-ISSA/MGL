import React, { useContext,useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Card from '../shared/card';
import TheContext from '../../Storge/thisContext';
import { ScreenNames } from '../../Storge/global';
import { age, Genre, platform } from '../../Storge/SortChices';

export const DrawerContent=(props)=> {

  const {User} = useContext(TheContext)
  const [showTags, setshowTags] = useState(false);
  const [hideCards, sethideCards] = useState(false);

  const Tags = [...Genre,...age,...platform]

  const renderCard = (item) => {
    // console.log(item)
    return(
      <Animatable.View style={{flex: 1}} key={item}
      animation={showTags ? 'fadeIn' : 'fadeOut'}>
        
          <TouchableOpacity key={item} 
          onPress={()=>props.navigation.navigate(ScreenNames.TagsScreen,{SortBy:[item]})}>
            <Card>
            <Text key={item} style={styles.Tags}>#{item}</Text>
            </Card>
          </TouchableOpacity>
        
      </Animatable.View>
    )
  };

  const renderTags = (item) => {
    // console.log(item)
    return(
      <Animatable.View style={{flex: 1}} key={item}
      animation={showTags ? 'fadeIn' : 'fadeOut'}>
        
          <TouchableOpacity key={item} 
          onPress={()=>props.navigation.navigate(ScreenNames.TagsScreen,{SortBy:[item]})}>
            <Card>
            <Text key={item} style={styles.Tags}>#{item}</Text>
            </Card>
          </TouchableOpacity>
        
      </Animatable.View>
    )
  };

    return(
        <View style={styles.drawerContent}>
          {/*User*/}
          <TouchableOpacity onPress={()=>{props.navigation.navigate(ScreenNames.Loading)}}>
            <View style={styles.userNav}>
              <Image
                source={{uri: User.image}}
                style={styles.img}/>
            </View>
            <View style={{alignItems:'center'}}>
              <Text style={styles.userName}> {User.name} </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.line}/>


            {/*content - navButton*/}
            
            <View style={styles.sectionsContent}>
              {hideCards?null:
              <Animatable.View
              animation={showTags ? 'fadeOut' : 'fadeIn'}>

              <TouchableOpacity onPress={()=>{props.navigation.navigate(ScreenNames.AllGames)}}>
                <Card>
                  <Text style={styles.SectionText}> AllGames </Text>   
                </Card>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{props.navigation.navigate(ScreenNames.MyList,{ reload: true })}}>
              {/* { random: Math.random() } */}
              {User.logged?
                <Card>
                  <Text style={styles.SectionText}> {'MyList'} </Text>
                </Card>:
                null}
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{props.navigation.navigate(ScreenNames.About)}}>
                <Card>
                  <Text style={styles.SectionText}> About </Text>
                </Card>
              </TouchableOpacity>

              </Animatable.View>
              }
              

              <Animatable.View style={{flex: 1}}
              animation={hideCards ? 'slideInUp' : 'slideInDown'}>
                
                <TouchableOpacity onPress={()=>{
                  setshowTags(!showTags)
                  if (hideCards) {
                    sethideCards(false)
                  }
                  }}>
                  <Card>
                    <Text style={styles.SectionText}> Tags </Text>
                  </Card>
                </TouchableOpacity>
                {showTags ? (
                  <Animatable.View style={{flex: 1}}
                  animation={showTags ? 'fadeIn' : 'fadeOut'}
                  onLayout={()=>{
                    sethideCards(true)
                  }}
                  >
                  <ScrollView style={{flex: 1,}}>
                    {Tags.map((item)=>renderTags(item.type))}
                  </ScrollView>
                  </Animatable.View>
                ) : null}
              </Animatable.View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex:1,
      backgroundColor:'#199',
      alignItems:'center',
      padding:10,
      borderTopEndRadius:15,
     borderBottomEndRadius:15,
    },
    userNav: {height:"25%", width:90, backgroundColor:'black',borderRadius:100},
    userName: {fontSize: 24, color:'black', fontWeight: '600',},
    line:{height:5, width:'80%', backgroundColor:'black', marginBottom:2,},
    sectionsContent: {
      height:"100%", width:'100%',
      backgroundColor:'#4545',
      alignItems:'stretch',
      padding:5,
      borderRadius:5
    },
    SectionText: {fontSize: 20, color:'black', fontWeight: '500',},
    img:{height: '100%', width: '100%', borderRadius:100, borderWidth:2, borderColor:'black'},
  });