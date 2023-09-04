import {React, useState} from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import MenuCheckOutForm from "./MenuCheckOutForm";
import { useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const MenuDisplay = ({navigation}) => {
  const [datafromModal, setDatafromModal] = useState([])
  const route = useRoute();
  const menuImages = route.params?.menuImages || "";
  const chairID = route.params?.chairID || ""
  const [isModalVisible, setModalVisible] = useState(false)
  const { width } = Dimensions.get("window");
  const imageHeight = 600; // Adjust this value according to your preference


  const showModal = () => {
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
  }

  const handleDatafromModal = (data) => {
    setDatafromModal(data)
    console.log(datafromModal)
  }
  //TODO
// 1.from appbar content 
//we show the modal

/*
2. We 
*/
  //
  return (                                            
    <View style={{ flex:1, backgroundColor:'white' }}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content color="white"title="Book IT" />
        <Appbar.Content color="white" icon="cart"/>               
      </Appbar.Header>
      <View>

            
</View>
      <ScrollView horizontal pagingEnabled>

        
        {menuImages.map((image, index) => (
          <View  key={index}>
         <TouchableOpacity > 
          <Image                         
          
            key={index}
            source={{ uri: image }}
            style={{
              width,
              height: imageHeight,
              resizeMode: "contain",      
            }}
          />
        </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View style={{marginBottom:270, alignItems:'center'}}>
                    

<TouchableOpacity onPress={showModal} style={styles.appButtonContainer}>
  <Text style={styles.appButtonText}> Order </Text>
</TouchableOpacity>
</View>
<MenuCheckOutForm chairID = {chairID} onDataRecieved={handleDatafromModal} visible={isModalVisible} onClose={hideModal}    navigation={navigation}/>


       

        </View>

    
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00008B",
    elevation: 0, // Remove shadow on Android
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default MenuDisplay;
