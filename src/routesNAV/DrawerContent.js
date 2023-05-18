import React, { useContext,useState } from 'react';
import { View, StyleSheet,} from 'react-native';
import TheContext from '../../Storge/thisContext';
import { ScreenNames } from '../../Storge/global';
import UserNav from '../component/DrawerContentComponent/UserNav';
import SettingsCardView from '../component/DrawerContentComponent/SettingsCardView';
import AnimatableTagView from '../component/DrawerContentComponent/AnimatableTagView';
import AnimatableSections from '../component/DrawerContentComponent/AnimatableSections';

export const DrawerContent=(props)=> {

  const {User} = useContext(TheContext)

  const RenderSectionsCard=()=>{

    const [showTags, setshowTags] = useState(false);
    const [hideTags, sethideTags] = useState(false);
    const [hideCards, sethideCardsa] = useState(false);

    const Sections=[
      {
        name:'Home',
        imge:'',
        onPress:()=>{}
      },
      {
        name:'All Games',
        imge:'',
        onPress:()=>{props.navigation.navigate(ScreenNames.AllGames)}
      },
      {
        name:'MyList',
        imge:'',
        onPress:()=>{props.navigation.navigate(ScreenNames.MyList,{ reload: true })} ,
        Show:()=>(User.logged)
      },
      {
        name:'Monthly Game',
        imge:'',
        onPress:()=>{},
      },
      {
        name:'Recommended',
        imge:'',
        onPress:()=>{},
        Show:()=>(User.logged)
      },
      {
        name:'Tags',
        imge:'',
        onPress:()=>onPressTags(),
      },
      {
        name:'News',
        imge:'',
        onPress:()=>{}
      },
      {
        name:'settings',
        imge:'',
        onPress:()=>{},
        Show:()=>(<SettingsCardView/>)
      },
    ]

    const onPressTags =()=>{
      setshowTags(true)
    }
    const onPressBack =()=>{
      sethideTags(true)
    }
    const onAnimationEnd=()=>{
      if (showTags) {
        sethideCardsa(true)
        sethideTags(false)
      }
      if (hideTags) {
        sethideCardsa(false)
        setshowTags(false)
      }
    }

    if (!hideCards||!showTags) {
      return(
        <AnimatableSections
        Sections={Sections}
        onAnimationEnd={onAnimationEnd}
        showTags={showTags}
        />
      )
    }
    else {
      return(
        <AnimatableTagView 
          hideTags={hideTags} 
          onAnimationEnd={onAnimationEnd} 
          onPressBack={onPressBack}
        />
      )
    }
  }

    return(
        <View style={styles.drawerContent}>
          {/*User*/}
          <View style={{height:'15%',width: '35%',}}>
            <UserNav navigate={props.navigation.navigate}/>
          </View>
          <View style={styles.line}/>


          {/*content - navButton*/}
          <View style={styles.sectionsContent}>
            <RenderSectionsCard/>
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
    line:{height:5, width:'80%', backgroundColor:'black',marginVertical:2},
    sectionsContent: {
      height:'85%',width: '100%',
      backgroundColor:'#4545',
      alignItems:'stretch',
      padding:5,
      borderRadius:5
    },
  });