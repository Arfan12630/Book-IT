import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons'

const DrawerComponent = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerAnimation = new Animated.Value(0);

  useEffect(() => {
    if (isDrawerOpen) {
      Animated.timing(drawerAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isDrawerOpen]);

  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <TouchableOpacity onPress={handleToggleDrawer} style={styles.button}>
          <Text style={styles.buttonText}>Open Drawer</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: drawerTranslateX }],
          },
        ]}
      >
        <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Settings</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop:100,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 130,
    height: '100%',
    backgroundColor: '#f1f1f1',
    padding: 10,
  },
  drawerItem: {
    marginTop:50,
    paddingVertical: 10,
  },
  drawerItemText: {
    marginTop:10,
    fontSize: 16,
  },
});

export default DrawerComponent;
