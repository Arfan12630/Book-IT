import { View, Text,ImageBackground,StyleSheet} from "react-native";
import React from "react";
import { Header } from "@rneui/themed";

import { useFonts } from 'expo-font';
import { LinearGradient } from "expo-linear-gradient";
import {
    Provider as PaperProvider,
    Appbar,
    IconButton,
    Button,
  } from "react-native-paper";
const NavHeader = () => {
                   
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
        <View>
            <Appbar.Header style={styles.header}>
            
              <Appbar.Content
            //     color="white"
            //    style={styles.headerContent}
            //     title="Book IT"
            style= {{flex:1, alignContent:'center', alignItems:'center', justifyContent:'center'}}
              />
              <Text style={{marginRight:109,alignItems:'center', justifyContent:'center',  fontSize: 26, fontFamily: "poppins-bold", color: "white"}}> Book It</Text>
              <Appbar.Action
                color="white"
                icon="account-circle"
             
              />
            </Appbar.Header>
            {/* <Header
               backgroundColor="00008B"
                centerComponent={{ text: "Book It", style: { fontSize: 26, fontFamily: "poppins-bold", color: "white" } }}
                rightComponent={<IconButton icon="account-circle" color="white" />}
            /> */}
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
      backgroundColor: "#00008B",
      fontFamily:'poppins-bold'
    },

})

export default NavHeader;
