import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity,Text,Image } from 'react-native';
import FontSize from "./FontSize"
import Spacing from "./Spacing";
import { useFonts } from 'expo-font';
import axios from 'axios'
const FormComponent = ({navigation}) => {
    const [restuaurantData, setRestuarantData] = useState({})
    const [postalCode, setPostalCode] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [fontsLoaded] = useFonts({
      'poppins-bold': require('../assets/Poppins-Bold.ttf'),
      'poppins-regular': require('../assets/Poppins-Regular.ttf'),
      'poppins-semiBold': require('../assets/Poppins-SemiBold.ttf')
  });

  if (!fontsLoaded) {
      // Font is still loading, show a loading state or fallback
      return null;
  }
  const submitFormHandler = async () => {
    const formData = {
      address: address,
      postalCode: postalCode,
      city: city,
      province: province,
      country: country,
    };
  
    try {
      const ip_address = '192.168.2.20'
      const url = `http://${ip_address}:5000/api/address`
      const response = await axios.post(url, formData);
      const responseData = response.data
  
      setRestuarantData(responseData)
      // setAddress('')
      // setPostalCode('')
      // setCity('')
      // setProvince('')
      // setCountry('')
    } catch (error) {
      console.error(error);
      // Handle errors
      // Display an error message or take appropriate action
    }
  };
 
  const submitUrlPress = async (restauarantUrl, restauarantName, restaurantAddress) => {
    //navigation.navigate('GettingTables',{name:restauarantName, address:restaurantAddress})
     navigation.navigate('AddingShape',{name:restauarantName, address:restaurantAddress})
    try{
    const ip_address = '192.168.2.20'
    const postUrl  = `http://${ip_address}:5000/api/getMenus`
    const response = await axios.post(postUrl, {
      url:restauarantUrl})
    const responseData = response.data
    // console.log(responseData)
  }
  catch(error){
    console.error(error)
  }
}

    return (    
      <View style={styles.container}>
      <View style={{marginTop:8}}></View>
      <View style={{alignItems:'center'}}> 
        <Text  style={{color:'#F0B27F', fontSize:FontSize.large, fontFamily:'poppins-bold'}}> Find Restuarants Near You </Text>
      </View>
           <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={text => setCity(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Province"
            value={province}
            onChangeText={text => setProvince(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Country"
            value={country}
            onChangeText={text => setCountry(text)}
          />
        </View>
    <View
    style={{
      marginTop:7         ,
      justifyContent:'center',
      alignItems:'center'
    }}>
        <TouchableOpacity
        style={{
          backgroundColor:'#F0B27F',
          width:200,
          borderRadius:16,
          borderColor:'white'
          
        }}
       
   
    >
        <Button
        style={{
            fontFamily:'poppins-bold',
            color:'white',
            textAlign:'center',
            fontSize:FontSize.large, 
            
                       
        }}
        onPress={submitFormHandler}
        title="Go"
        color='white'

        > 
        </Button>
        </TouchableOpacity>
        </View>
        <View>
    
        {Object.values(restuaurantData).map((restaurant, index) => (
          <View key={index}>
            <TouchableOpacity onPress={() => submitUrlPress(restaurant.url, restaurant.name, restaurant.address)}>
            <Text>{restaurant.name}</Text>
            </TouchableOpacity>
            <View style={{width:100, height:100}}>
            <Image source={{ uri: restaurant.image }}  style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
            />
            </View>

            <Text>{restaurant.address}</Text>
            <Text>Rating: {restaurant.rating}</Text>
          </View>
        ))}
        </View>
  </View>
     
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      marginTop:6
    },
    input: {
      height:35,
      flex: 1,
      marginRight: 10,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor:'white',
      borderRadius: 16,
      textAlign:'center'
    },
    searchContainer: {
      marginBottom: 10,
    },
    searchInput: {
      height: 40,
      marginRight: 10,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: 'white',
      backgroundColor: 'white',
      borderRadius: 16,
      textAlign: 'center',
    },
    buttonContainer : {
      marginTop:10,
    }
  });
  
  export default FormComponent;