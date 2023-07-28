import { Dimensions, ImageBackground, SafeAreaView, StyleSheet,Text,View,TouchableOpacity } from "react-native";
import {React,useEffect} from "react"
 import { Colors } from "react-native";
import Spacing from './Spacing'
import FontSize from './FontSize'
import { useFonts } from 'expo-font';
const {height} = Dimensions.get("window")
const LoginPage = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/Poppins-Regular.ttf')
    });

    if (!fontsLoaded) {
        // Font is still loading, show a loading state or fallback
        return null;
    }

   
    return (
        <SafeAreaView>
            <View>
                <ImageBackground style={{
                    height:height/2.5,
                }}
                resizeMode = "contain"
                source={require("../assets/welcome-img.png")}/>
                <View 
                style={{
                    paddingHorizontal:Spacing * 4,
                    paddingTop: Spacing*4,
                }}
                >
                    <Text
                    style = {{
                        fontSize: FontSize.xxLarge,
                        color:'blue',
                        fontFamily:'poppins-bold',
                        textAlign:"center"
                    }}
                    > 
                    Experience a new age of dining in 
                    </Text>



                    <Text
                    style = {{
                        fontSize: FontSize.small,
                        color:'black',
                        fontFamily:'poppins-regular',
                        textAlign:"center",
                        marginTop:Spacing * 2
                    }}
                    > 
                    Get the best and most efficient dine in service
                    </Text>
                    <View
                    style = {{
                        flexDirection:"row",
                        paddingHorizontal: Spacing * 2, 
                        paddingTop:Spacing * 6,

                    }}
                    >
                    
                        <TouchableOpacity
                        style={{
                            backgroundColor:'blue',
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
                            borderRadius: Spacing,   
                        }}
                        onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={{
                                fontFamily: 'poppins-bold',
                                color:'white',
                                fontSize:FontSize.large,
                                textAlign:"center",
                                borderRadius:Spacing,

                            }}>
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                         
                            paddingVertical: Spacing * 1.5,
                            paddingHorizontal: Spacing * 2,
                            width: "48%",
                            borderRadius: Spacing, 
                        }}
                        onPress={() => navigation.navigate('Register')}>
                            <Text style={{
                                fontFamily: 'poppins-bold',
                                color:'black',
                                fontSize:FontSize.large,
                                textAlign:"center",
                                borderRadius:Spacing,

                            }}>
                                Register
                            </Text>
                        </TouchableOpacity>

                    

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginPage