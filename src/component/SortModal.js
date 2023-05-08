import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable, } from 'react-native';
import { globalImage } from '../../Storge/global';


const SortModal =({setSortModalVisible,sortData,setType,setSortTypeButtonShowsModal})=>{
    
    return(
      <Pressable style={{ flex:1,flexDirection:'column-reverse',}}
       onPress={()=>setSortModalVisible(false)}>
        
        <Pressable style={styles.sortModal}>
          
          {/* hed */}
          <View style ={styles.SortModalHed}>
            <Text style={styles.title}>sort by -</Text>

            <TouchableOpacity  onPress={()=>[sortData.reSort(),setSortModalVisible(false)]}>
            <Text style={{fontSize:20, fontWeight:'500'}}>ReSORT</Text>
            </TouchableOpacity>
          </View>

          {/* content */}
          <View style={{width: '100%',height: '60%',}}>
            
            <View style={styles.sortModalContent}>

              <Text style={{fontSize:20,}}>Name -</Text>

              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('A-Z'),setSortModalVisible(false)]}>
                  <Text style={{fontSize:20,}}>(A-Z)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataAZ('Z-A'),setSortModalVisible(false)]}>
                  <Text style={{fontSize:20,}}>(Z-A)</Text>
                </TouchableOpacity>
              </View>
              
            </View>

            <View style={styles.sortModalContent}>
              <Text style={{fontSize:20,}}> Rating - </Text>

              <View style ={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("low"),setSortModalVisible(false)]}>
                  <Image
                  source={{uri: globalImage.LowToHigh}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRating("high"),setSortModalVisible(false)]}>
                  <Image
                  source={{uri: globalImage.HighToLow}}
                  style={{height: 30,width: 30,}}/>
                </TouchableOpacity>
              </View>

            </View>
            <View style={styles.sortModalContent}>
              <Text style={{fontSize:20,}}> Release Date  </Text>
              
            <View style ={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRelease("low"),setSortModalVisible(false)]}>
                <Image
                source={{uri: globalImage.LowToHigh}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sortModalButtonChoice} onPress={()=>[sortData.sortDataRelease("high"),setSortModalVisible(false)]}>
                <Image
                source={{uri: globalImage.HighToLow}}
                style={{height: 30,width: 30,}}/>
              </TouchableOpacity>
            </View>

            </View>

          </View>

          {/* <SortButtonShowsModal/> */}
          <View style={{flex:1.5,flexDirection:'row'}}>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('Genre')}}>
              <Text style={{fontSize:16}}> Genre ^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('platform')}}>
              <Text style={{fontSize:16}}> platform ^</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sortModalButton}
             onPress={()=>{setSortTypeButtonShowsModal(true),setSortModalVisible(false),setType('age')}}>
              <Text style={{fontSize:16}}> age ^</Text>
            </TouchableOpacity>
          </View>

          

        </Pressable>
      </Pressable>      
    )
  }

  const styles = StyleSheet.create({
    
    title:{fontSize:30, fontWeight:'700',paddingBottom:3},
  
    sortModal:{
      flex:0.5,flexDirection:'column',borderTopRightRadius:30,
      borderTopLeftRadius:30, backgroundColor: '#264348',alignItems:'center',
      justifyContent:'center', borderWidth:2, elevation:10,
    },
    SortModalHed:{
      height:'20%' ,width:'90%', flexDirection:'row',
      justifyContent:'space-between',paddingTop:5
    },
    sortModalContent:{
      width:'100%', borderBottomWidth:1, margin:5, padding:10, alignItems:'center',
      justifyContent:'space-between', flexDirection:'row', borderStyle:'dashed'
    },
    sortModalButton:{
      flex:1, borderRadius:10, alignItems:'center', justifyContent:'center', paddingHorizontal:5, margin:5,
        marginVertical:15,backgroundColor:"#179999",
    },
    sortModalButtonChoice:{marginHorizontal:4, padding:3, borderRadius:10,opacity: 0.7,backgroundColor:'#00827f'},
      
    });
  
  
  export default SortModal;