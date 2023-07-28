import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity,Text } from 'react-native';
import FontSize from "./FontSize"
import Spacing from "./Spacing";
import { useFonts } from 'expo-font';

const FormComponent = () => {
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
    return (     
      
      <View style={styles.container}>
        
      
      <View style={{marginTop:25}}></View>
      <View style={{alignItems:'center'}}> 
        <Text  style={{color:'white', justifyContent:'center',fontSize:FontSize.large, fontFamily:'poppins-bold'}}> Find Any Restuarant </Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search Restaurant"/>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Enter City/Province"/>
      </View>
           {/* <View style={styles.row}>
         
        </View>
        <View style={styles.row}>
          
          
        </View> */}
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
        title="Go"
        color='white'

        > 
        </Button>
        </TouchableOpacity>
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