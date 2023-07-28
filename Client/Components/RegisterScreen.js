
import {SafeAreaView, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Button} from "react-native"
import {React,useState} from "react"
import FontSize from "./FontSize"
import Spacing from "./Spacing";
 
import { useFonts } from 'expo-font';
import { Colors } from "react-native/Libraries/NewAppScreen";
const RegisterScreen = ({navigation}) => {
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
    <SafeAreaView>
        <View
        style={{
            padding:Spacing * 2,
            
        }}>



<View
style={{
    alignItems:'center',
}}>

<Text
style ={{
    fontSize:FontSize.xLarge,
    color:'blue',
    fontFamily:'poppins-bold',
    marginVertical:Spacing * 3,
    
}}
> Create an Account </Text>

<Text
style={{
    fontFamily:'poppins-semiBold',
    fontSize:FontSize.small,
    maxWidth:"80%",
    textAlign:'center'
}}
> Create an account so you can reserve and order at your favourite restuarant at the same time</Text>
</View>



<View style={{
    marginVertical:Spacing *3
}}>
    <TextInput 
    placeholderTextColor={'black'}
    placeholder = "Email" 
    style={{
        fontFamily:'poppins-regular',
        fontSize: FontSize.small,
        padding:Spacing * 2,
        backgroundColor:"#f1f4ff",
        borderRadius:Spacing,
        marginVertical:Spacing,
    }}
    
    />
    
<TextInput 
    placeholderTextColor={'black'}
    placeholder = "Password"
    secureTextEntry
    style={{
        fontFamily:'poppins-regular',
        fontSize: FontSize.small,
        padding:Spacing * 2,
        backgroundColor:"#f1f4ff",
        borderRadius:Spacing,
        marginVertical:Spacing,  
    }}
    />
     
    <TextInput 
    placeholderTextColor={'black'}
    placeholder = "Confirm Password"
    secureTextEntry
    style={{
        fontFamily:'poppins-regular',
        fontSize: FontSize.small,
        padding:Spacing * 2,
        backgroundColor:"#f1f4ff",
        borderRadius:Spacing,
        marginVertical:Spacing,  
    }}
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
    style = {{
        padding: Spacing * 2, 
        backgroundColor:'blue',
        marginVertical: Spacing * 3,
        borderRadius: Spacing,
        shadowColor:'white',
        shadowOffset: {
            width:0,
            height:Spacing,
        },
        shadowOpacity:0.3,
        shadowRadius: Spacing,
                                  
    }}
    >
        <Button
        style={{
            fontFamily:'poppins-bold',
            color:'white',
            textAlign:'center',
            fontSize:FontSize.large,             
        }}
        title="sign in"
     
        > 
        </Button>
    </TouchableOpacity>
<TouchableOpacity
style = {{
    paddding:Spacing,
   
}}
onPress = {() => navigation.navigate('Login') }
>
<Text style={{
fontFamily:'poppins-semiBold',
color:'black',
textAlign:"center",
fontSize: FontSize.small,
}}> Already Have an account
</Text>
</TouchableOpacity>
</View>

        </SafeAreaView>
  )
}

export default RegisterScreen