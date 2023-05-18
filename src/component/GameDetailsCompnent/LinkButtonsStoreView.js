import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import { globalHW } from '../../../Storge/global';

const LinkButtonsStoreView = ({platform}) => {
    return (
        <TouchableOpacity
        key={platform.platform}
        style={styles.linkButtons}
        onPress={()=>platform.onPress?.()}
        >
        <Image
          source={{uri: platform.Image}}
          style={{
            height:(platform.platform=='PC'||
            platform.platform=='Nintendo_Switch')?'70%':'100%',
            width: (platform.platform=='PC'||
            platform.platform=='Nintendo_Switch')?'70%':'100%',
          }}
        />
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    linkButtons:{
        height:globalHW.windowHeight*0.075,
        width:globalHW.windowHeight*0.075, 
        borderRadius:100,
        alignItems: 'center',
        justifyContent: 'center', 
        borderWidth:1,
        backgroundColor: '#26868d',
      },
})

export default LinkButtonsStoreView;
