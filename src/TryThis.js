import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

function TryThis() {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendVerificationCode = () => {
    // Generate a random verification code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Send the verification code via email using your backend or email service provider
    sendVerificationEmail(email, randomCode)
      .then(() => {
        // Verification email sent successfully
        Alert.alert('Verification Code Sent', 'Please check your email for the verification code.');
      })
      .catch(error => {
        // Handle the error
        Alert.alert('Error', 'Failed to send verification code. Please try again.');
      });
  };

  const handleVerify = () => {
    // Compare the entered verification code with the generated one
    if (verificationCode === randomCode) {
      // Code is correct, proceed with email verification
      Alert.alert('Email Verified', 'Your email has been successfully verified!');
    } else {
      // Code is incorrect
      Alert.alert('Incorrect Verification Code', 'Please enter the correct verification code.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Button title="Send Verification Code" onPress={handleSendVerificationCode} />

      <TextInput
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={text => setVerificationCode(text)}
      />
      <Button title="Verify" onPress={handleVerify} />
    </View>
  );
}

// Function to send the verification email using your backend or email service provider
function sendVerificationEmail(email, verificationCode) {
  // Implement your email sending logic here (e.g., using nodemailer or an email API)
  return new Promise((resolve, reject) => {
    // Simulating the email sending process with a timeout
    setTimeout(() => {
      const emailSentSuccessfully = true; // Set to false if there's an error

      if (emailSentSuccessfully) {
        resolve();
      } else {
        reject(new Error('Failed to send verification email.'));
      }
    }, 2000);
  });
}

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