import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {NavigationContainer, navigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import LoadingScreen from './Components/LoadingScreen';
import LoginPage from './Components/LoginPage';
import MainAppScreen from './Components/MainAppScreen';
import RegisterScreen from './Components/RegisterScreen';
import Home from './Components/Home';
import RestuarantLayout from './Components/RestuarantLayout';
import AddingShape from './Components/AddingShape'
import RestuarantFormComponent from './Components/RestuarantFormComponent'
import { useFonts } from 'expo-font';
import DrawerComponent from './Components/DrawerComponent';
import FormComponent from './Components/FormComponent';
import YourComponent from './Components/YourComponent';
import GettingTables from './Components/GettingTables';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const Stack = createStackNavigator()       
  useEffect(() => {
    // Simulate some asynchronous tasks
    setTimeout(() => {
      setIsLoading(false);
    }, 3500); // Adjust the duration as needed
  }, []);

  if (isLoading){
    return <LoadingScreen/>
  }

  return (
    <NavigationContainer>
       <Stack.Navigator>
       {/* <Stack.Screen  name="MainAppScreen"  component={MainAppScreen} options={{headerShown:false}} />
      <Stack.Screen  name="Login"  component={LoginPage} options={{headerShown:false}} />
      <Stack.Screen name ="Register" component={RegisterScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Layout" component={RestuarantLayout} options={{headerShown:false}}/> */}
      {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>   */}
       {/* <Stack.Screen name="FormComp" component={FormComponent} options={{headerShown:false}}/> */}
      <Stack.Screen name = "AddingShape" component={AddingShape} options={{headerShown:false}}/> 
      {/* <Stack.Screen name="GettingTables" component={GettingTables} options={{headerShown:false}}/> */}
      </Stack.Navigator>  
    {/* // <View style={{ flex: 1 }}>
    //   {isLoading ? <LoadingScreen /> : <AddingShape/>}
    // </View> */}
    </NavigationContainer>
  );
};

export default App;






