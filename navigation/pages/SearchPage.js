import * as React from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import * as Location from 'expo-location';
import { TouchableOpacity } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import ClinicInfoCard from './ClinicInfoCard';
import getDistanceFromLatLonInKm from '../utils'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  searchBarContainer: {
    flexDirection: 'row',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    alignItems: 'center',
  },
  dropdown: {
    flex: 0.2,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily:'System',
    marginBottom: '5%',
  },
  buttonFontStyle: {
    fontSize: 14,
    color: '#000',
  },
  buttonStyle:{
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 6,
    borderColor: '#000',
  },
});

export default function SearchPage({navigation}){
    const [input, setInput] = React.useState("");
    const [result, setResult] = React.useState([]);
    const [userLocation, setUserLocation] = React.useState("")

    //
    const getAllClinicData = async () => {
      const headers = {
        'Content-Type': 'application/json', 
        'Access-Control-Request-Headers': '*', 
        'api-key': process.env.API_KEY, 
        'Accept': 'application/ejson' 
      }

      const body = {
        "collection":"clinics",
        "database":"veterinarian_clinics",
        "dataSource":"Cluster0"
      }

      response = await axios.post('https://us-east-1.aws.data.mongodb-api.com/app/data-pngam/endpoint/data/v1/action/find', body, { headers: headers })
      setResult(response.data.documents)
    }

    //
    const getUserLocation = async () => {
      // Permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, please share your location permissions to get the distance :)');
      }
      // Get User's Location
      const userLocation = await Location.getCurrentPositionAsync({});
      setUserLocation(userLocation)
    }

    // Query user location and clinic data when the component first mounted.
    React.useEffect(() => {
      getUserLocation();
      getAllClinicData();
    }, [])

    // 
    const onClearPress = () => {
      setInput("");   
      getAllClinicData()      
    }

    const onChangeText = async (text) => {
      setInput(text)
    };

    const onSearchPress = () => {
      newResult = [...result].filter(item =>
        {
          let include = false
          for (var s in item.services_offered){
            if (s.toLowerCase().includes(input.toLowerCase())) {
              include = true
            }
          }  
          return item.name.toLowerCase().includes(input.toLowerCase()) || include
        }
      )
      setResult(newResult)
    }

    // Sort by Rating
    const onSortByRatingsPress = () =>{
      newResult = [...result].sort((a, b) => {
        ratingOfA = a.rating.$numberDouble? a.rating.$numberDouble : a.rating.$numberInt
        ratingOfB = b.rating.$numberDouble? b.rating.$numberDouble : b.rating.$numberInt
        return ratingOfB - ratingOfA
      });
      setResult(newResult)
    }

    // Sort by Distance
    const onSortByDistance = async() =>{
        latitude = userLocation.coords.latitude
        longitude = userLocation.coords.longitude
        //Sort
        newResult = [...result].sort((a, b) => {
          const distanceOfA = getDistanceFromLatLonInKm(latitude, longitude, parseFloat(a.location.coordinates[1]["$numberDouble"]), parseFloat(a.location.coordinates[0]["$numberDouble"]));
          const distanceOfB = getDistanceFromLatLonInKm(latitude, longitude, parseFloat(b.location.coordinates[1]["$numberDouble"]), parseFloat(b.location.coordinates[0]["$numberDouble"]));
          return distanceOfA - distanceOfB
        });
        setResult(newResult);
    }
    
    // Filter by Service
    const filterByVet = () =>{
      console.log(result.length)
      newResult = [...result].filter(item => 
        item.services_offered.includes("health")
        // item.services_offered.includes("veterinary_care")
      );
      setResult(newResult)
      console.log("afterVet:",newResult.length)
    }

    // Filter by Open Now
    // The following outlines the pseudo-code as placeholder
    // 1. Get the current time of the user
      // const currentTime = new Date();
    // 2. Assuming we have the open and close times for each clinic in a comparable format
      // clinics.forEach(clinic => {
      //   const openingTime = new Date(`2023-01-01T${clinic.openingTime}:00`); 
      //   const closingTime = new Date(`2023-01-01T${clinic.closingTime}:00`);
    // 3. Check if the clinic is currently open
      //   if (currentTime > openingTime && currentTime < closingTime) {
      //     clinic.isOpenNow = true;
      //   } else {
      //     clinic.isOpenNow = false;
      //   }
      // });
    // 4. Filter the result list to include only the clinics that are open
      // const openClinics = clinics.filter(clinic => clinic.isOpenNow);


    console.log("render")

    return(
      <View style={styles.container}>
        
      {/* Header */}
        <View justifyContent='flex-start' flexDirection='row' alignItems='center' marginBottom='3%'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="angle-left" size={18} color="black" />
          </TouchableOpacity>
          <Text marginLeft='3%'>Vet Hospital List</Text>
        </View>

      {/* Find a Vet */}
        <View style={styles.header}>
          <Text>Find a Vet</Text>
          <View flexDirection='row' alignItems='center'>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text marginRight='3%'>Map Version</Text>
            </TouchableOpacity>
            <Icon name="angle-right" size={20} color="black" />
          </View>
        </View>

      {/* SearchBar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={input}
            placeholder="Search for Vet..."
            autoCapitalize='none'
            autoCorrect={false}
            autoFocush
          />
          <Icon
            name="search"
            size={20}
            onPress={onSearchPress}
            style={styles.searchButton}
          />
          <Icon
            name="ban"
            size={20}
            onPress={onClearPress}
            style={styles.searchButton}
          />
        </View>

      {/* Explain Text */}
        <View>
          <Text>
            Enter a location or specific service
          </Text>
        </View>
        
      {/* Filters Row */}
        <View flexDirection='row' justifyContent='space-between' marginTop='2%' marginBottom='5%'>
          <Button
            title="Sort by"  // ratings
            type="outline"
            titleStyle={styles.buttonFontStyle}
            buttonStyle={styles.buttonStyle}
            onPress={onSortByRatingsPress}
          />
          <Button
            title="Vet Hospital"
            color="red"
            type="outline"
            titleStyle={styles.buttonFontStyle}
            buttonStyle={styles.buttonStyle}
            onPress={filterByVet}
          />
          <Button
            title="Open Now"
            type="outline"
            titleStyle={styles.buttonFontStyle}
            buttonStyle={styles.buttonStyle}
            onPress={() => { }}
          />
          <Button
            title="Distance"
            type="outline"
            titleStyle={styles.buttonFontStyle}
            buttonStyle={styles.buttonStyle}
            onPress={onSortByDistance}
          />
        </View>

        { result.length !== 0 && (
          <FlatList
            data={result}
            renderItem={({ item }) => <ClinicInfoCard item={item} userLocation={userLocation}/>}
          />
        )}
      </View>
    )}