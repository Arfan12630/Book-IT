import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import NavHeader from './NavHeader';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Card, Text } from 'react-native-paper';

const Nav = () => {
  const [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/Poppins-Regular.ttf'),
    'poppins-semiBold': require('../assets/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    // Font is still loading, show a loading state or fallback
    return null;
  }

  const optionsData = [
    {
      id: 1,
      title: 'Search for your restaurant',
      subtitle: 'Reserve and order food',
    },
    {
      id: 2,
      title: 'Create your own restaurant Layout',
      subtitle: 'Engage more customers',
    },
  ];

  return (
    <View style={styles.container}>
    
        <NavHeader />

        <View style={styles.cardContainer}>
          {optionsData.map((option) => (
            <TouchableOpacity>
            <View key={option.id} style={styles.cardWrapper}>
              <Card style={styles.card}>
                <Card.Cover
                  source={{
                    uri:
                      'https://img.freepik.com/premium-vector/couples-date-cafe-flat-color-vector-illustration-boyfriend-girlfriend-talking-table-partner-with-phones-two-group-people-2d-cartoon-characters-with-cafeteria-interior-background_151150-5710.jpg',
                  }}
                />
                <Card.Content style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{option.title}</Text>
                  <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                </Card.Content>
              </Card>
            </View>
            </TouchableOpacity>
          ))}
        </View>
   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  cardContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  cardWrapper: {
    marginTop: 20,
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    // overflow: 'hidden',
    elevation: 5,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardTitle: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: 'poppins-regular',
    fontSize: 14,
    color: '#666',
  },
});

export default Nav;
