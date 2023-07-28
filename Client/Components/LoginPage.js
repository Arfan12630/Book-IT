import {SafeAreaView, StyleSheet, Text, View, TextInput, Touchable, TouchableOpacity, Button} from "react-native"
import {React,useState} from "react"
import FontSize from "./FontSize"
import Spacing from "./Spacing";
import axios from "axios";
import { useFonts } from 'expo-font';
import { Colors } from "react-native/Libraries/NewAppScreen";
import {ip_address} from './FormComponent'
const LoginPage = () => {
  const [emailValue, setEmailValue] = useState("")
  const [passwordEntry, setPasswordEntry] = useState("")
  const [showErrors, setShowErrors] = useState(false)

  const emailValueisValid = emailValue.trim() !== ""
  const passwordValueisValid = passwordEntry.trim() !== ""
    // const [emailName, setEmailName] = useState("")
    // const [password, setPassword] = useState("") 
    const [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/Poppins-Regular.ttf'),
        'poppins-semiBold': require('../assets/Poppins-SemiBold.ttf')
    });

    if (!fontsLoaded) {
        // Font is still loading, show a loading state or fallback
        return null;
    }

    const emailInputHandler = (enteredText) => {
        setEmailValue(enteredText)
    }

    const passwordInputHandler = (enteredValue) => {
        setPasswordEntry(enteredValue)
    }
    
    const submitHandler  = async () => {
        const formData = {
            email:emailValue,
            password:passwordEntry
        }
        try {
            const url = `http://${ip_address}:5000/api/login`
            const response = await axios.post(url,formData )
            console.log(response.data)
            setEmailValue('')
            setPasswordEntry('')
            if(response.data.success){
            
            }
            else {

            }
        }
     
       
        catch(error) {
            console.error(error)
        }
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
> Login Here </Text>

<Text
style={{
    fontFamily:'poppins-semiBold',
    fontSize:FontSize.large,
    maxWidth:"60%",
    textAlign:'center'
}}
>Welcome back you've been missed!</Text>
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
    onChangeText = {emailInputHandler}
    value={emailValue}
    />
    {showErrors && !emailValueisValid && (
          <Text style={{ color: 'red' }}>Email should not be empty</Text>
        )}
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
    onChangeText={passwordInputHandler}
    value={passwordEntry}/>
      {showErrors && !passwordValueisValid && (
          <Text style={{ color: 'red' }}>Password should not be empty</Text>
        )}
    </View>
    <View>
    <Text style={{
    fontFamily:'poppins-semiBold',
    fontSize:FontSize.small,
    color:'blue',
    alignSelf:'flex-end',

}}> Forgot your password? </Text>
    </View>
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
        onPress={submitHandler}
        > 
        </Button>
    </TouchableOpacity>
<TouchableOpacity
style = {{
    paddding:Spacing,
   
}}
>
<Text style={{
fontFamily:'poppins-semiBold',
color:'black',
textAlign:"center",
fontSize: FontSize.small,
}}> Create New Account 
</Text>
</TouchableOpacity>
</View>

        </SafeAreaView>
    )
}
export default LoginPage