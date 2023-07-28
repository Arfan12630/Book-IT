import React,{useState} from 'react'
import {View, Text, Image, ImageBackground, Button, StyleSheet} from 'react-native'
import {TextInput,ScrollView,TouchableOpacity} from 'react-native-gesture-handler'
import FormComponent from './FormComponent'
import RestuarantCuisines from './RestuarantCuisines'
import RestuarantFormComponent from './RestuarantFormComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontSize from "./FontSize"
import Spacing from "./Spacing";
import { useFonts } from 'expo-font';
const Home = () => {
// TODO
// CONDITIONALLY RENDER THE FORM  
 

  const [isToggled, setIsToggled]  = useState(true)


  
const toggleForm = () => {
  setIsToggled(!isToggled)
}
  const [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/Poppins-Regular.ttf'),
    'poppins-semiBold': require('../assets/Poppins-SemiBold.ttf')
});

if (!fontsLoaded) {
    // Font is still loading, show a loading state or fallback
    return null;
}


    return(
        <View style={{
            backgroundColor:"#FFF",
            flex:1
        }}>
           <View style={{
               backgroundColor:"#00008B",
               height:"36%",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
             <View>
     
     
    </View>
    
   
            
            <View style={{marginTop:55, alignItems:'center'}}>
          <Text style={{color:'white', fontSize:FontSize.large, fontFamily:'poppins-bold'}}> Search Restuarants Near You?</Text>
        </View>
        <View
    style={{
      marginTop:7         ,
      justifyContent:'center',
      alignItems:'center'
    }}>
        <TouchableOpacity
         onPress={toggleForm}
        style={{
          backgroundColor:'#871F78',
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
        title="Click Here"
        color='white'
    
        > 
        </Button>
        </TouchableOpacity>
        </View>
               {isToggled ? <FormComponent />: <RestuarantFormComponent/>}  
               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>
              
                   <View style={{width:"50%",}}>
                        <Text style={{
                            fontSize:28,
                            
                            color:"#FFF",
                            fontWeight:"bold"
                        }}></Text>
                   </View>    
               </View>
           </View>
          <View>
          <View style={{marginTop:45}}>
              
              <Text> Choose a Cuisine</Text>
                   
                 <RestuarantCuisines/>
                 </View>
                 </View>
             
            

       </View>
            

            
                

                


      
    )
}


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
      },
      text: {
        position: 'absolute',
        top: 10,
        left: 10,
        color: 'white',
        fontSize: 20
      }
})
export default Home;