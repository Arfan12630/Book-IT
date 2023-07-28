import { View, Text,Image, ScrollView } from 'react-native'
import React from 'react'
import Card from './Card/Card'

const RestuarantCuisines = () => {
    const cuisines = [
        {
            id:'1',
           genre:'Burgers',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Burgers.jpg" 
           
        },
        
        {
            id:'2',
           genre:'Pizza',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Pizza.jpg"
           
        },
        {
            id:'3',
           genre:'Sushi',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Sushi.jpg"
           
        },
        {
            id:'4',
           genre:'Italian',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Italian.jpg"
           
        },
        {
            id:'5',
           genre:'Mexican',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Mexican.jpg"
        },
        {
            id:'6',
           genre:'Asian',
           image:"https://s3-us-west-2.amazonaws.com/mfcollectnew/tiles/web/Asian.jpg"
           
        },
        
    ]
  return (
    <ScrollView style={{
      flexGrow: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 16,
    paddingBottom: 16
    }}>
  
      {cuisines.map((cuisine) => (
        <Card key={cuisine.id}>
        <Image source={{uri:cuisine.image}} style={{ width: '100%', height: 200,  borderTopLeftRadius: 8,
    borderTopRightRadius: 8 }}/>
       </Card>
      ))}
      </ScrollView>
  
  )
}

export default RestuarantCuisines