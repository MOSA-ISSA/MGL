import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import TheContext from '../../Storge/thisContext';
import TheButton from './TheButton';
import TheModal from './TheModal';
import { globalHW } from '../../Storge/global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import YouShoudLogIn from './YouShoudLogIn';
import AddDoneAnimation from '../asets/animations/AddDoneAnimation';

const AddGametoListButton = ({ item, buttonStyle, buttonNameStyle,}) => {

  const navigation = useNavigation();

  const { User, setUser, } = useContext(TheContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [animationVisible, setAnimationVisible] = useState(false)
  const include = (Object.values(User.list).flat().some((game) => game.gameName == item.gameName));//
  const options = ['played', 'planToPlay', 'playing', 'trash']



  // const AddorRemove={
  //     handlAddToListButton:(item)=>{
  //      if (User.logged) {
  //        //setModalVisible(true)
  //        let include= (User.list.some((list)=>list.gameName==item.gameName));
  //        if(!include){
  //          User.list.push(item)
  //          AsyncStorage.setItem(User.name, JSON.stringify(User));
  //          setModalVisible(true)
  //          console.log('aded');
  //        }else{
  //          removefromList(item)
  //        }
  //      }else{
  //        console.log('u shud to log in');
  //         Alert.alert('you are not logged', 'Do you have an user', [
  //          {
  //            text: 'Cancel',
  //            style: 'cancel',
  //          },
  //          {text: 'log in', onPress: () => navigation.navigate('LogIn')},
  //          {text: 'sign in', onPress: () => navigation.navigate('SignIn')},
  //        ]);
  //      }
  //    },
  //   }

  const findItemUserList = () => {
    const game = Object.values(User.list).flat().find((game) => game.gameName === item.gameName);
    return game || null;
  };
  const inWhichListIncludeAndWhere = () => {
    if (include) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        const index = User.list[option].indexOf(findItemUserList());
        // console.log(index);
        if (index !== -1) {
          return { listName: option, index: index };
        }
      }
    }
    return null;
  };
  const addToListButtonIcon = () => {/////////////////need Images/////////////////////
    let itemInfo = inWhichListIncludeAndWhere()

    if (itemInfo) {
      const icons = {
        played: 'v',
        planToPlay: '-v',
        playing: '|>',
        trash: 'x',
      }
      return icons[itemInfo.listName]

    } else {
      return '+'
    }
  }

  const RenderOptionsToAdd = ({ item }) => {

    const onPressOptionsToAdd = (option) => {
      removeItemFromAllList(item)
      User.list[option].push(item)
      setUser({...User})
      AsyncStorage.setItem(User.name, JSON.stringify(User));
      // setModalVisible(false)
      console.log('aded + ' + item.gameName);
      setAnimationVisible(true)
    }
    const pressedButton = (option) => (
      {
        backgroundColor: (User.list[option].some((game) =>
          game.gameName == item.gameName)) ? 'green' : '#288',
      }
    )
    const removeItemFromAllList = (item) => {
      console.log(item.gameName);
      let itemInfo = inWhichListIncludeAndWhere()
      console.log(itemInfo);
      if (itemInfo) {
        User.list[itemInfo.listName].splice(itemInfo.index, 1)
        setUser({...User})
        AsyncStorage.setItem(User.name, JSON.stringify(User));
        setModalVisible(false)
        console.log('removed - ' + item.gameName);
      }
      // if (needToRender) {
      //   needToRender(true)
      // }
    }

    const RenderOptionsButton = () => (
      <View style={styles.optionsSt}>
        {options.map((option) =>
          <TheButton
            key={option}
            buttonName={option}
            buttonNameStyle={{ fontSize: 20 }}
            buttonStyle={[styles.buttonStyle, pressedButton(option)]}
            onPress={() => onPressOptionsToAdd(option)}
          />
        )}
      </View>
    )
    const RenderAtherButton = () => {
      const AtherButton = [
        {
          show: true,
          name: 'Cancle',
          Style: styles.CancleButton,
          onPress: () => setModalVisible(false)
        },
        {
          show: include,
          name: 'remove from list',
          Style: styles.removeFromListButton,
          onPress: () => removeItemFromAllList(item)
        }
      ]
      return (
        <View style={styles.optionsSt}>
          {AtherButton.map((item) => item.show ?
            <TheButton
              key={item.name}
              buttonName={item.name}
              buttonNameStyle={{ fontSize: 20 }}
              buttonStyle={item.Style}
              onPress={item.onPress}
            /> : null
          )}
        </View>
      )
    }

    return (
      <>
        <Text>Add  {item.gameName} to :</Text>
        <RenderOptionsButton />
        <RenderAtherButton />
      </>
    )
  }

  const onPressadd = () => {
    if (User.logged) {
      setModalVisible(true)
    } else {
      YouShoudLogIn(navigation)
    }
  }

  return (
    <View>
      <TheButton buttonNameStyle={buttonNameStyle}
        buttonName={addToListButtonIcon()}
        buttonStyle={buttonStyle}
        onPress={() => onPressadd()} />

      <TheModal setModalVisible={modalVisible} animationType={'fade'}>
        <View style={styles.centerModal}>
          {!animationVisible ?
            <View style={styles.wharetoAdd}>
              <RenderOptionsToAdd item={item} />
            </View>
            :
            <View style={styles.AddDoneAnimation}>
              <AddDoneAnimation setModalVisible={(values) => {
                setModalVisible(values)
                setAnimationVisible(values)
              }}
              />
            </View>
          }
        </View>
      </TheModal>

    </View>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  AddDoneAnimation: {
    height: (globalHW.windowWidth * 0.5), width: (globalHW.windowWidth * 0.5),
    backgroundColor: "#0d697a", borderRadius: 100,
    borderColor: 'black', borderWidth: 2, elevation: 5
  },
  wharetoAdd: {
    // height:(globalHW.windowWidth*0.5),width:(globalHW.windowWidth*0.5),
    backgroundColor: "#0d697a", borderRadius: 10,
    borderColor: 'black', borderWidth: 2, elevation: 5,
    padding: 10,

  },
  optionsSt: {
    flexDirection: 'row',
  },
  buttonStyle: {
    margin: 5,
    padding: 5,
    backgroundColor: '#4545',
    borderRadius: 10
  },
  CancleButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#65000b',
    borderRadius: 10,
    flexGrow: 1,
    flex: 1,
  },
  removeFromListButton: {
    margin: 5,
    padding: 5,
    backgroundColor: '#515151',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4545',
    flexGrow: 1,
    flex: 1,
  },


})

export default AddGametoListButton;
