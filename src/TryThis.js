import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const TryThis = () => {
  const [viewMoved, setViewMoved] = useState(false);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animatable.View
        animation={viewMoved ? 'fadeInUp' : 'fadeIn'}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: 100,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          transform: [{ translateY: viewMoved ? 0 : 100 }],
        }}
      >
        <Text style={{ color: 'white', fontSize: 24 }}>I'm at the top now!</Text>
      </Animatable.View>
      <TouchableOpacity onPress={()=>setViewMoved(!viewMoved)}>
        <View style={{ padding: 10, backgroundColor: 'blue' }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Move to Top</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TryThis;

//export default TryThis;

// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';

// const gamesData = [
//   { name: 'Mario Kart', genre: ['Racing','Adventure'] },
//   { name: 'Minecraft', genre: ['Adventure'] },
//   { name: 'Fortnite', genre: ['Battle Royale'] },
//   { name: 'FIFA', genre: ['Sports'] },
// ];

// const TryThis = () => {
//   const [selectedGenres, setSelectedGenres] = useState([]);
//   const [games, setGames] = useState([...gamesData]);

//   console.log('====================================');
//   console.log(selectedGenres);
//   console.log('====================================');

//   const toggleGenreSelection = (genre) => {
//     if (selectedGenres.includes(genre)) {
//       setSelectedGenres(selectedGenres.filter((g) => g !== genre));
//     } else {
//       setSelectedGenres([...selectedGenres, genre]);
//     }
//   };

//   const getFilteredGames = () => {
//     if (!selectedGenres.length) {
//       return gamesData;
//     }
  
//     return gamesData.filter((game) =>
//       selectedGenres.every((g) => game.genre.includes(g))
//     );
//   };

//   const renderItem = ({ item }) => (
//     <View style={{ marginVertical: 10 }}>
//       <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       <Text>{item.genre}</Text>
//     </View>
//   );

//   return (
//     <View style={{ flex: 1, padding: 20 }}>
//       <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Racing')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Racing') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Racing</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Adventure')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Adventure') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Adventure</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Battle Royale')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Battle Royale') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Battle Royale</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity
//           onPress={() => toggleGenreSelection('Sports')}
//           style={{
//             borderWidth: 1,
//             borderColor: selectedGenres.includes('Sports') ? 'red' : 'gray',
//             borderRadius: 10,
//             padding: 5,
//             margin: 5,
//           }}
//         >
//           <Text>Sports</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         onPress={() =>{
//            setGames([...getFilteredGames()])
//           }} // replace with sorting implementation
//         style={{ backgroundColor: 'blue', padding: 10, marginTop: 10 }}
//       >
//         <Text style={{ color: 'white' }}>Done</Text>
//       </TouchableOpacity>

//       <FlatList
//         data={games}
//         keyExtractor={(item) => item.name}
//         renderItem={renderItem}
//         style={{ marginTop: 20 }}
//       />
//     </View>
//   );
// };

// export default TryThis;


// import React, { useState } from 'react';
// import { FlatList, Button, View, Text } from 'react-native';

// const games = [
//   { id: '1', name: 'Mario Kart', genre: 'Racing' },
//   { id: '2', name: 'Fortnite', genre: 'Battle Royale' },
//   { id: '3', name: 'Call of Duty', genre: 'First Person Shooter' }
// ];

// const GenreSelector = ({ selectedGenres, onGenrePress }) => {
//   const genres = ['Racing', 'Battle Royale', 'First Person Shooter'];

//   return (
//     <>
//       {genres.map((genre, i) => (
//         <Button
//           key={`genre-${i}`}
//           onPress={() => onGenrePress(genre)}
//           title={genre}
//           color={selectedGenres.includes(genre) ? 'green' : 'gray'}
//         />
//       ))}
//     </>
//   );
// };

// const GameItem = ({ game }) => {
//   return (
//     <View>
//       <Text>{game.name}</Text>
//     </View>
//   );
// };

// const TryThis = () => {
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const handleGenrePress = (genre) => {
//     if (selectedGenres.includes(genre)) {
//       setSelectedGenres(selectedGenres.filter((g) => g !== genre));
//     } else {
//       setSelectedGenres([...selectedGenres, genre]);
//     }
//   };

//   const filteredGames = selectedGenres.length
//     ? games.filter((game) => selectedGenres.includes(game.genre))
//     : games;

//   return (
//     <>
//       <Button
//         onPress={() => setSelectedGenres([])}
//         title="Clear filters"
//       />

//       <FlatList
//         data={filteredGames}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <GameItem game={item} />
//         )}
//       />

//       <GenreSelector
//         selectedGenres={selectedGenres}
//         onGenrePress={handleGenrePress}
//       />
//     </>
//   );
// };



// export default TryThis;