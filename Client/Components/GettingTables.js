import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Draggable from 'react-native-draggable'
const GettingTables = () => {
  const [seatData, setSeatData] = useState({});
  const [chairData, setChairData] = useState([])
  const route = useRoute();
  const name = route.params?.name || '';
  const address = route.params?.address || '';

  const fetchTables = async () => {
    const ip_address = '192.168.2.20';
    const url = `http://${ip_address}:5000/api/getReservedSeats`;
    try {
      const response = await axios.get(url, {
        params: {
          name: name,
          address: address,
        },
      });

    console.log(response.data)
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const removeChair =(id) => {
    console.log(id)
  }

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <View>
      {seatData.map((shape) => (
        <Draggable
          key={shape.id}
          x={shape.x}
          y={shape.y}
          renderSize={shape.size}
          renderColor="transparent"
        
        >
          <View style={styles.chair}>
            <Image source={{ uri: shape.image }} style={styles.chairImage} />
          </View>
        </Draggable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    borderColor: 'black',
  },
  draggablesContainer: {
    flex: 1,
    padding: 16,
    borderColor: 'black',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 120,
    height: '100%',
    backgroundColor: '#f1f1f1',
    padding: 16,
    zIndex: 2,
  },
  drawerItem: {
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 8,
  },
  drawerIte: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingVertical: 8,
  },
  drawerItemText: {
    fontSize: 16,
  },
  chair: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  circlechair: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 29,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  table: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: 200,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  horizontaltable: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 8,
    width: 60,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chairImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
   
  },
  circleChairImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
   
  },
  overlay: {
    position: 'absolute',
    bottom: 0, // Position the overlay at the bottom
    left: 0,
    right: 0,
    height: 140, // Set desired height for the overlay
    backgroundColor: 'black', // Darker background color
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  overlayButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },

  overlayButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },

});
export default GettingTables;
