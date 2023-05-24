import { StyleSheet,Dimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    backgroundColor: '#0d516a',
    flex: 1,
    //alignItems:'center',
    justifyContent:'center',
  },
});

export const globalHW ={
  windowWidth : Dimensions.get('window').width,
  windowHeight : Dimensions.get('window').height,

}

export const globalImage ={
  HighToLow : 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/low_sales_business_down_arrow-512.png',
  LowToHigh : 'https://cdn2.iconfinder.com/data/icons/finance-4-1/32/sales_up_growing_good_arrow_bars-512.png',
  search:'https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/09_search-1024.png',
  sort: 'https://th.bing.com/th/id/R.339b47ac85f8459e966b5faf4fb5fa7e?rik=YApSb4LsQGeNHw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_195267.png&ehk=dh%2buEUEjYSlZMqT0VMa%2f9LqRWVhi8tm7zU57s8UK8xM%3d&risl=&pid=ImgRaw&r=0',

}

export const ScreenNames ={
  StartLoading:'StartLoading',
  DrawerNav:'DrawerNav',
  GameDetails:'GameDetails',
  SignIn:'SignIn',
  MyList:'MyList',
  TagsScreen:'TagsScreen',
  AllGames:'AllGames',
  About:'About',
  Loading:'Loading',
  UserScreen:'UserScreen',
  LogIn:'LogIn',
}

// export const images = {
//   ratings: {
//     '1': require('../assets/rating-1.png'),
//     '2': require('../assets/rating-2.png'),
//     '3': require('../assets/rating-3.png'),
//     '4': require('../assets/rating-4.png'),
//     '5': require('../assets/rating-5.png'),
//   }
// };