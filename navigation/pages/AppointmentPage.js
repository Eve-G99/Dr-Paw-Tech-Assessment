import * as React from 'react';
import { Text, View } from 'react-native';
import CommonStyles from './CommonStyles';

export default function AppointmentPage({navigation}){
    return(
      <View View style={CommonStyles.container}>
        <Text
            onPress={() => navigation.navigate('Appointment')}
            style={[CommonStyles.boldText]}>
            Appointment Page </Text>
      </View>
    )
}