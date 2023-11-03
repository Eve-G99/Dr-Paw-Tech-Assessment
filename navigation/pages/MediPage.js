import * as React from 'react';
import { Text, View } from 'react-native';
import CommonStyles from './CommonStyles';

export default function MediPage({navigation}){
    return(
      <View View style={CommonStyles.container}>
        <Text
            onPress={() => navigation.navigate('Medication')}
            style={[CommonStyles.boldText]}>
            Medication Page </Text>
      </View>
    )
}