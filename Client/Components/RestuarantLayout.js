import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { Provider as PaperProvider, Appbar, IconButton, Button} from 'react-native-paper';
import Draggable from 'react-native-draggable';
import uuid from 'react-native-uuid'
const RestuarantLayout = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [chairShapes,setChairShapes] = useState([])
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

   const addNewChair = () => {
    const newShape = {
      id: uuid.v4(),
      x:100,
      y:150,
      color:'blue',
      size:50,
      image:require('../assets/logo3.png'),
      text:'Chair'

    }
    setChairShapes([...chairShapes, newShape])
   }


   const addNewTable = () => {
    const newTable = {
      id: uuid.v4(),
      x:100,
      y:150,
      color:'blue',
      size:50,
      image:require('../assets/logo3.png'),
      text:'Chair'
    }
   }
   const removeChair = (id) => {
    const filteredShapes = shapes.filter((shape) => shape.id !== id)
    setChairShapes(filteredShapes)
   }
  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleOutsidePress = () => {
    setDrawerOpen(false);
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 0],
  });

  return (
    <PaperProvider>
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={styles.container}>
          <Appbar.Header style={styles.header}>
            <Appbar.Action icon="pencil" onPress={handleToggleDrawer} />
            <Appbar.Content title="Restuarant Layout" />
            <Appbar.Action icon="magnify" />
            </Appbar.Header>
            <View style={styles.draggablesContainer}>
        
        </View>
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: drawerTranslateX }],
              },
            ]}
          >
             <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerIte}>
            <Text> Customize Layout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addNewChair} style={styles.drawerItem}>
              <IconButton icon="seat" style={styles.drawerItemText} size={20}/>
              <Text>Chair</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
            <IconButton icon="table-furniture" style={styles.drawerItemText} size={20}/>
            
            <Text> Table</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
            <IconButton icon="window-closed-variant" style={styles.drawerItemText} size={20}/>
            <Text> Window</Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
            <IconButton icon="cash-register" style={styles.drawerItemText} size={20}/>
            <Text> Cash Register</Text> 
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.content}>
            <View style={styles.draggablesContainer}>
              {shapes.map((shape) => (
            <Draggable
            key={shape.id}
            x={shape.x}
            y={shape.y}
            renderSize={shape.size}
            renderColor={shape.color}
            renderText={shape.text}
            image = {shape.image}
            onShortPressRelease={() => removeChair(shape.id)}
            />
              
          ))}
            </View>
          </View>
          <Button Title="Add Shape"></Button>
        </View>
      </TouchableWithoutFeedback>
    </PaperProvider>
  );
}

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
    borderColor:'black'
  },
  draggablesContainer: {
    flex: 1,
    padding: 16,
    borderColor:'black'
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
    backgroundColor:'#ADD8E6',
    alignItems:'center',
    marginTop: 30,
    paddingVertical: 8,
  },
  drawerIte: {
  justifyContent:'center',
    alignItems:'center',
    marginTop: 30,
    paddingVertical: 8,
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default RestuarantLayout;
