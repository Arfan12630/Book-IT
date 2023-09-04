import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {v4 as uuid} from 'uuid'
import { useRoute } from '@react-navigation/native';
import MenuCartCheckout from './MenuCartCheckout';
import { Modal } from 'react-native-paper';
const MenuCheckOutForm = ({ chairID ,onDataRecieved,visible, onClose,navigation}) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [childData, setChildData] = useState([])
  // useEffect(() => {
  //   // Calculate total price whenever foodItems changes
  //   const newTotalPrice = foodItems.reduce((total, item) => total + item.itemPrice, 0);
  //   setTotalPrice(newTotalPrice);
  // }, [foodItems]); // The effect depends on foodItems

  const handleItemNameChange = (text) => {
    setItemName(text);
  };

  const handleItemPriceChange = (text) => {
    setItemPrice(text);
  };

  const getCurrentDate = () => {
    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const date = today.getDate()

    return `${month}/${date}/${year} `
  }

  const handleSubmit = () => {
  
  
    const newOrder = {    
      id:Math.random(),
      itemName: itemName,
      itemPrice: parseFloat(itemPrice),
      dateCreated: getCurrentDate(),
      currentTime:"k"  
           
    };
    
    setFoodItems([...foodItems, newOrder]);
 
    onDataRecieved(foodItems)
  
    
   
    // Clear input fields after submission
    setItemName('');
    setItemPrice('');
    console.log(chairID)
    onClose()
  };

 const cartCheckout = () => {
 navigation.navigate("CheckoutForm", {items:foodItems, id:chairID})
 }
  return (
    <Modal visible={visible}>
      <TouchableWithoutFeedback onPress={onClose}>
   <View style={styles.overlay}/>
    </TouchableWithoutFeedback>
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Enter restaurant item"
        onChangeText={handleItemNameChange}
        value={itemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter item price"
        onChangeText={handleItemPriceChange}
        value={itemPrice}
        keyboardType="numeric"
      />
      <Button
        title="Add to order"
        onPress={handleSubmit}
      />

<Button
        title="Close"
        onPress={onClose}
      />
<ScrollView  
style={{height:70}}>
      {foodItems.map((data) => (
         <View key={data.id} style={{flexDirection:'row'}}>
         <Text> {data.itemName}</Text>
 
         <Text>{data.itemPrice}</Text>
         </View>
     
      ))}
      </ScrollView>
      <View style={{marginTop:130, justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity onPress={cartCheckout}>
            <Text>Finish</Text>
            </TouchableOpacity>          
    </View>

    </View>
          
    </Modal>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  container: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
});

export default MenuCheckOutForm;
