import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ShowData from './ShowData';

const ButtonMenu = ({data, onDataPress,}) => {


  const TheButton=({buttonName,onPress,buttonStyle,textStyle})=>{
    return(
      <TouchableOpacity
        style={buttonStyle}
        onPress={onPress}>
        <Text style={textStyle}>{buttonName}</Text>
      </TouchableOpacity>
    )
  }//will export



  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.ButtonBorderV}>
      
      <TheButton 
      buttonName={'^'} 
      onPress={() => [setModalVisible(!modalVisible),]}
      buttonStyle={[styles.buttonStyle,{backgroundColor:'#4687D1'}]}
      textStyle={[styles.textStyle,{fontSize:20}]}
      />{/*Short way*/}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalView}>

            <View style={{height:'7.3%',width:'100%',flexDirection:'row',}}>
              <TheButton 
              buttonName={'v'} 
              onPress={() => setModalVisible(false)}
              buttonStyle={[styles.buttonStyle,{backgroundColor:'#4687D1',elevation: 5,},]}
              textStyle={styles.textStyle}
              />
              <View style={{flex:4.9,alignItems:'center',justifyContent:'center',}}>
                <Text style={[styles.textStyle,{fontSize:25}]}>-</Text>
                </View>
              
            </View>{/* button close */}

            <ShowData
              data={data}
              dataInRow={1}
              dataStyle={styles.dataStyle}
              onPress={(item)=>onDataPress(item)}
              textStyle={[styles.textStyle,{fontSize:25,fontWeight: 'normal',}]}
              />

          </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  ButtonBorderV: {
    width:'11.1%',
  },
  modalView: {
    height:'100%',
    width:'60%',
    backgroundColor:'#3CB3C6',
    elevation: 100,
    borderBottomRightRadius:30,
    borderTopRightRadius:30,
    //opacity:0.2,
  },
  buttonStyle: {
    height:'100%',
    flex:1,
    margin:3,
    justifyContent:'center',
    borderRadius:10,
    //backgroundColor:,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dataStyle: {
    flex:1,
    margin:10,
    backgroundColor:'#4687D1',
    elevation: 10,
    borderRadius:12,
  }
});

export default ButtonMenu;