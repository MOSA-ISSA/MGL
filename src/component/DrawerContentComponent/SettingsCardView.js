import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from '../card';

const SettingsCardView = () => {
    return (
        <View style={{flex:1,justifyContent:'flex-end'}}>
            <Card onPress={()=>{}}>
                <Text style={styles.SectionText}> settings </Text>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    SectionText: {fontSize: 20, color:'black', fontWeight: '500',},
})

export default SettingsCardView;
