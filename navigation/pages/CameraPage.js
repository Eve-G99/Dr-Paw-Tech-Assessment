import * as React from 'react';
import { Text, View } from 'react-native';
import CommonStyles from './CommonStyles';

export default function CameraPage({navigation}){
    return(
      <View View style={CommonStyles.container}>
        <Text
            onPress={() => navigation.navigate('Camera')}
            style={[CommonStyles.boldText]}>
            Camera Page </Text>
      </View>
    )
}