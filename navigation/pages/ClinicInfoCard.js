import React from 'react';
import { View, Text, StyleSheet, Image, Share } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import getDistanceFromLatLonInKm from '../utils';

const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 5,
    },
    imageInfoContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginLeft: 5,
        marginRight: 5,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom:10,
    },
    infoContainer:{
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 20,
        flexShrink: 1,
    },
    boldText: {
        fontWeight: 'bold'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    serviceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 5,
    },
    serviceLink:{
        flexDirection: 'column',
        marginTop: 10,
        marginLeft: 20,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    serviceButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mapsButton: {
        backgroundColor: '#1A3B6B',
        padding: 8,
        borderRadius: 5,
        marginRight: 20,
    },
    mapsButtonText: {
        fontWeight: 'bold',
        color: 'white'
    }
});

const ClinicInfoCard = ({ item, userLocation }) => {
    //Pic Placeholder
    // const getRandomImage = () => {
    //     const randomInt = Math.floor(Math.random() * 1000);
    //     return `https://picsum.photos/id/${randomInt}/100/100`;
    // }

    const getDistance = () =>{
        latitude = userLocation.coords.latitude
        longitude = userLocation.coords.longitude
        distance = getDistanceFromLatLonInKm(latitude, longitude, parseFloat(item.location.coordinates[1]["$numberDouble"]), parseFloat(item.location.coordinates[0]["$numberDouble"]));
        return distance
    }

    return (
        <View style={styles.cardContainer}>
            {/* Image and Info */}
            <View style={styles.imageInfoContainer}>
                <Image source={require('../cute-puppy.jpg')} style={styles.image} />
                {/* Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.boldText}>{item.name}</Text>
                    <Text>{item.address}</Text>                    
                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        {(() => {
                            const ratingValue = item.rating.$numberDouble ? parseFloat(item.rating.$numberDouble) : parseInt(item.rating.$numberInt);
                            {/* Render stars based on the rating */}
                            return [...Array(5)].map((_, index) => {
                                return (
                                    <Icon 
                                        key={index}
                                        name={(index < Math.floor(ratingValue)) ? "star" : "star-o"} 
                                        size={15} 
                                        color={(index < Math.floor(ratingValue)) ? "yellow" : "grey"}
                                    />
                                );
                            });
                        })()}
                        <Text>({item.user_ratings_total.$numberInt})</Text>
                    </View>
                    <View style={styles.distanceContainer}>
                        <Icon name="map-pin" size={15} /> 
                        {(() => {
                            const distance = Number(getDistance()).toFixed(2)
                            return <Text> {distance} km</Text>
                        })()}
                    </View>
                </View>
            </View>

            {/* Service and Book Appointment */}
            <View style={styles.serviceContainer}>
                <View style={styles.serviceLink}>
                    <View style={styles.serviceItem}>
                        <Text> <Icon name="headphones" size={20} color="grey" />   Services Provided</Text>
                    </View>
                    <View style={styles.serviceItem}>
                        <Text> <Icon name="calendar" size={20} color="grey" />   Book an Appointment</Text>
                    </View>
                </View>
                <View style={styles.serviceButton}>
                    <TouchableOpacity style={styles.mapsButton}>
                        <Text style={styles.mapsButtonText}>Maps</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

export default ClinicInfoCard;
