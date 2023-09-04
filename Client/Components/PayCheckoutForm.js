import { View, Text, TextInput,StyleSheet} from 'react-native'
import React from 'react'

const PayCheckoutForm = ({navigation}) => {
  return (
    <View>
        <View>
         <TextInput
       
          placeholder="Postal Code"
          value={postalCode}
        
        />
        <TextInput
       
          placeholder="Address"
       
       
        />
      </View>
      <View style={styles.row}>
        <TextInput
       
          placeholder="City"
        
        />
        <TextInput
       
          placeholder="Province"
       
        />
        <TextInput
       
          placeholder="Country"
        
        />
    </View>
    </View>
  )
}

export default PayCheckoutForm