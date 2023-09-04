import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Touchable,
  TouchableOpacity,
  Button,
} from "react-native";
import { React, useState } from "react";
import FontSize from "./FontSize";
import Spacing from "./Spacing";

import { useFonts } from "expo-font";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PasswordRequisite from "./PasswordRequisite";
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [pwdRequisite, setPWDRequisite] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });
  const [fontsLoaded] = useFonts({
    "poppins-bold": require("../assets/Poppins-Bold.ttf"),
    "poppins-regular": require("../assets/Poppins-Regular.ttf"),
    "poppins-semiBold": require("../assets/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const emailHandler = (text) => {
    if (isValidEmail(text)) {
      setMessage("Email is invalid");
    } else {
      setMessage(null);
    }

    setEmail(text);
  };
  const passwordHandler = (text) => {
    setPassword(text);
  };

  const passwordFocusHandler = () => {
    setPWDRequisite(true);
  };

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const repeatedPasswordHandler = (text) => {
    setConfirmPassword(text);
  };
  const passwordKeyHandler = (text) => {
    const pwdLengthCheck = text.length >= 8;
    const capsLetterCheck = /(?=.*[A-Z])/.test(text);
    const numberCheck = /[0-9]/.test(text);
    const specialCharCheck = /(?=.*[_\W])/.test(text);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck,
    });
  };

  const submitHandler = async () => {
    if (confirmPassword !== password) {
      return;
    }

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    const ip_address = "192.168.2.20";
    const url = `https://${ip_address}:5000/api/register`;
    try {
      const response = await axios.post(url, userData);
      const data = response.data;
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      console.log(data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: Spacing * 2,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.xLarge,
              color: "blue",
              fontFamily: "poppins-bold",
              marginVertical: Spacing * 3,
            }}
          >
         
            Create an Account
          </Text>

          <Text
            style={{
              fontFamily: "poppins-semiBold",
              fontSize: FontSize.small,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            {" "}
            Create an account so you can reserve and order at your favourite
            restuarant at the same time
          </Text>
        </View>

        <View
          style={{
            marginVertical: Spacing * 3,
          }}
        >
          <TextInput
            placeholderTextColor={"black"}
            placeholder="Name"
            style={{
              fontFamily: "poppins-regular",
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: "#f1f4ff",
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
            onChangeText={(text) => setName(text)}
            value={name}
          />

          <TextInput
            placeholderTextColor={"black"}
            placeholder="Email"
            style={{
              fontFamily: "poppins-regular",
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: "#f1f4ff",
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
            onChangeText={(text) => emailHandler(text)}
            value={email}
          />

          <TextInput
            placeholderTextColor={"black"}
            placeholder="Password"
            secureTextEntry
            style={{
              fontFamily: "poppins-regular",
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: "#f1f4ff",
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
            onChangeText={(text) => {
              passwordHandler(text);
              passwordKeyHandler(text);
            }}
            value={password}
            onFocus={passwordFocusHandler}
          />
          {pwdRequisite ? (
            <PasswordRequisite
              capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
              numberCheckFlag={checks.numberCheck ? "valid" : "invalid"}
              pwdLengthCheckFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
              specialCharCheckFlag={
                checks.specialCharCheck ? "valid" : "invalid"
              }
            />
          ) : null}

          <TextInput
            placeholderTextColor={"black"}
            placeholder="Confirm Password"
            secureTextEntry
            style={{
              fontFamily: "poppins-regular",
              fontSize: FontSize.small,
              padding: Spacing * 2,
              backgroundColor: "#f1f4ff",
              borderRadius: Spacing,
              marginVertical: Spacing,
            }}
            onChangeText={repeatedPasswordHandler}
            value={confirmPassword}
          />
        </View>
        {/* <View>
    <Text style={{
    fontFamily:'poppins-semiBold',
    fontSize:FontSize.small,
    color:'blue',
    alignSelf:'flex-end',

}}> Forgot your password? </Text>
    </View> */}
        <TouchableOpacity
          style={{
            padding: Spacing * 2,
            backgroundColor: "blue",
            marginVertical: Spacing * 3,
            borderRadius: Spacing,
            shadowColor: "white",
            shadowOffset: {
              width: 0,
              height: Spacing,
            },
            shadowOpacity: 0.3,
            shadowRadius: Spacing,
          }}
          onPress={submitHandler}
        >
          <Button
            style={{
              fontFamily: "poppins-bold",
              color: "white",
              textAlign: "center",
              fontSize: FontSize.large,
            }}
            title="sign in"
          ></Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddding: Spacing,
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Text
            style={{
              fontFamily: "poppins-semiBold",
              color: "black",
              textAlign: "center",
              fontSize: FontSize.small,
            }}
          >
            {" "}
            Already Have an account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
