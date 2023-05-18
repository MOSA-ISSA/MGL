import React from 'react';
import * as Animatable from 'react-native-animatable';
import SectionsCard from '../SectionsCard';

const AnimatableSections = ({Sections,showTags,onAnimationEnd}) =>(
        <Animatable.View style={{flex:1}}
        animation={showTags ? 'fadeOut' : 'slideInLeft'}
        onAnimationEnd={()=>onAnimationEnd()}
        >
            {Sections.map((Section,i)=>
            (!Section.Show||Section.Show()==true)?
            <SectionsCard
                key={i}
                onPress={Section.onPress}
                name={Section.name}
            />
            :
            <Section.Show key={i}/>
            )}
        </Animatable.View>
    );

export default AnimatableSections;
