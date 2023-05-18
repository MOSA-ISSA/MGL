import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SectionsCard from '../SectionsCard';
import { Genre, age, platform } from '../../../Storge/SortChices';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../Storge/global';

const AnimatableTagView = ({hideTags,onAnimationEnd,onPressBack}) => {
  const navigation = useNavigation();

  const Tags = [...Genre,...age,...platform]

  const RenderTags = () => {
    // console.log(item)
    return(
      <ScrollView >
          {Tags.map((tag,i)=>
            <SectionsCard
            key={i}
            onPress={()=>navigation.navigate(ScreenNames.TagsScreen,{SortBy:[tag.type]})}
            name={'#'+tag.type}
            TextStyle={{fontSize: 15}}
            />
          )}
      </ScrollView>
    )
  };

    return (
        <Animatable.View style={{flex:1}}
        animation={!hideTags ? 'slideInLeft' : 'fadeOut'}
        onAnimationEnd={()=>onAnimationEnd()}
        >
          <SectionsCard
              onPress={()=>onPressBack()}
              name={'back'}
          />
          <RenderTags/>

        </Animatable.View>
    );
}


export default AnimatableTagView;
