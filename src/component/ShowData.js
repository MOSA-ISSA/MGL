import React from 'react';
import { FlatList, Text, TouchableOpacity} from 'react-native';

const ShowData=({data,dataInRow,dataStyle,onPress,textStyle,})=>{
    return(
      <FlatList
        data={data}
        numColumns={dataInRow}
        renderItem={({ item }) => (
          <TouchableOpacity style={dataStyle}
          onPress={()=>{onPress(item)}}
          >
            <Text style={textStyle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    )
  }

  export default ShowData