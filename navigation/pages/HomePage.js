import * as React from 'react';
import { Text, View } from 'react-native';
import CommonStyles from './CommonStyles';

export default function HomePage({navigation}){
    return(
      <View View style={CommonStyles.container}>
        <Text
            onPress={() => navigation.navigate('Home')}
            style={[CommonStyles.boldText]}>
            Home Page </Text>
      </View>
    )
}