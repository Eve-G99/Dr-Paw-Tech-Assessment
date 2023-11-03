import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

//Screens
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import CameraPage from './pages/CameraPage';
import MediPage from './pages/MediPage';
import SearchPage from './pages/SearchPage';

//Screen Names
const homepageName = 'Home';
const appointmentpageName = 'Appointment';
const camerapageName = 'Camera';
const searchpageName = 'Search';
const medipageName = 'Medication';

//Create the Tab Navigator
const Tab = createBottomTabNavigator();
export default function MainContainer(){
    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homepageName}
            screenOptions ={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homepageName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === appointmentpageName){
                        iconName = focused ? 'videocam' : 'videocam-outline'
                    } else if (rn === camerapageName){
                        iconName = focused ? 'videocam' : 'videocam-outline'
                    } else if (rn === medipageName){
                        iconName = focused ? 'help-circle' : 'help-circle-outline'
                    } else if (rn === searchpageName){
                        iconName = focused ? 'search' : 'search-outline'
                    }
                    
                    return <Ionicons name={iconName} size ={size} color={color} />         
                }
            })}>
            <Tab.Screen
                name="Home"
                component={HomePage}
            />
            <Tab.Screen
                name="Appointment"
                component={AppointmentPage}
            />
            <Tab.Screen
                name="Camera"
                component={CameraPage}
            />
            <Tab.Screen
                name="Medication"
                component={MediPage}
            /> 
            <Tab.Screen
                name="Search"
                component={SearchPage}
            />
            </Tab.Navigator>

        </NavigationContainer>
    )
}