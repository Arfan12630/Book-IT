import React from "react";
import { Appbar } from "react-native-paper";
import {
  View,
  Modal,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const MenuCartCheckout = ({navigation}) => {
  const route = useRoute();
  const foodItems = route.params?.items || "";

  const handlePay = () => {
    navigation.navigate("PayCheckoutForm")
  }
  return (
    <View>
      <Appbar.Header style={styles.header}>
        <Appbar.Content color="white" />
      </Appbar.Header>

      <View style={{ marginTop: 20 }}>
        <View>
          <Text> Checkout</Text>
        </View>

        {!!foodItems.length &&
          foodItems.map((item) => (
            <View key={item.id} style={{ flexDirection: "row" }}>
              <Text> {item.itemName}</Text>
              <Text>{item.itemPrice}</Text>
            </View>
          ))}
        <View>
          <TouchableOpacity>
            <Text> GO BACK</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePay}>
            <Text> PROCEED </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00008B",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    position: "absolute",
    top: "40%",
    left: "10%",
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default MenuCartCheckout;
