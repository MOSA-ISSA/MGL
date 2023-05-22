import React from 'react';
import { StyleSheet, View, Pressable, } from 'react-native';
import ModalHed from './SortModalComponent/ModalHed';
import Choises from './SortModalComponent/Choises';
import SortButtonShows from './SortModalComponent/SortButtonShows';


const SortModal =(props)=>{

    const {
      setSortModalVisible,
      sortData,
      setType,
      setSortTypeButtonShowsModal
    } = props

    const closeModal=()=>setSortModalVisible(false)

    const RenderChoises = () => {/*Name-Rating-Release Date*/
      const choicses =[
        {
          choice:'Name',
          onPress1:()=>{sortData.sortDataAZ('AZ'),setSortModalVisible(false)},
          onPress2:()=>{sortData.sortDataAZ('ZA'),setSortModalVisible(false)},
          text:true
        },
        {
          choice:'Rating',
          onPress1:()=>[sortData.sortDataRating("low"),setSortModalVisible(false)],
          onPress2:()=>[sortData.sortDataRating("high"),setSortModalVisible(false)],
        },
        {
          choice:'Release Date',
          onPress1:()=>[sortData.sortDataRelease("low"),setSortModalVisible(false)],
          onPress2:()=>[sortData.sortDataRelease("high"),setSortModalVisible(false)],
        },
      ]
    
      return choicses.map((item,i)=>(<Choises key={i} item={item}/>));
    }

    const RenderSortButtonShowsModal=()=>{
      const types=['Genre','platform','age']

      return types.map((item,i)=><SortButtonShows Type={item} key={i}
       setSortTypeButtonShowsModal={setSortTypeButtonShowsModal}
       setSortModalVisible={setSortModalVisible}
       setType={setType}/>
       )
    }

    return(
      <Pressable style={styles.View}
       onPress={()=>closeModal()}>
        
        <Pressable style={styles.sortModal}>
          
          {/* hed */}
          <ModalHed 
          sortData={sortData}
          closeModal={closeModal}/>

          {/* content */}
          <View style={styles.contentView}> 
            <RenderChoises/> 
          </View>

          {/* <SortButtonShowsModal/> */}
          <View style={styles.SortButtonShowsModalView}>
          <RenderSortButtonShowsModal/>
          </View>

        </Pressable>
      </Pressable>      
    )
  }

  const styles = StyleSheet.create({
    sortModal:{
      flex:0.5,flexDirection:'column',borderTopRightRadius:30,
      borderTopLeftRadius:30, backgroundColor: '#264348',alignItems:'center',
      justifyContent:'center', borderWidth:2, elevation:10,
    },
    contentView:{
      width: '100%',
      height: '60%',
    },
    View:{
      flex:1,
      flexDirection:'column-reverse',
    },
    SortButtonShowsModalView:{
      height: '20%',
      width:'100%',
      flexDirection:'row',
    },  
    });
  
  
  export default SortModal;