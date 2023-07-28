import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { Provider as PaperProvider, Appbar, IconButton, Button} from 'react-native-paper';
import Draggable from 'react-native-draggable';
import uuid from 'react-native-uuid';
import ConfirmationModal from "./ConfirmationModal";
import FormModal from "./FormModal";
import { useRoute } from "@react-navigation/native";
import axios from "axios";                                            
const AddingShape = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [chairShapes, setChairShapes] = useState({})
  const [circleChairShapes, setCircleChairShapes] = useState([])
  const [tableShapes, setTableShapes] = useState([])
  const [horizontalTableShapes, setHorizontalTableShapes] = useState([])
  const [circleTableShapes, setCircleTableShapes] = useState([])

  const [chairShapeCoordinates, setChairShapeCoordinates] = useState([])
  const[circleChairCoordinates, setCircleChairCoordinates] = useState([])
  const [verticalTableCoordinates, setVerticalTableCoordinates] = useState([])
  const [horizontalTableShapeCoordinates, setHorizontalTableShapeCoordinates] = useState([])
  const drawerAnimation = new Animated.Value(0);

  const route = useRoute()
  const name = route.params?.name || '';
  const address = route.params?.address||'';
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
      x: 100,
      y: 150,
      color: 'blue',
      size: 67,
      image: require('../assets/chair1.jpg'),
      text: 'Chair',
    };
    setChairShapes(prevShape => ({
      ...prevShape,
      [newShape.id]:newShape
      
      
    }));
    // setChairShapeCoordinates([...chairShapeCoordinates, newShape])
    console.log(chairShapes)
  };

  const removeChair = (id) => {
    setChairShapes(prevShape => {
      const updatedShapes = {
        ...prevShape,
        chairShapes:{...prevShape.chairShapes}
      }
      delete updatedShapes.chairShapes[id]
      return updatedShapes
    });
   
  };

  const addNewCircleChair = () => {
    const newCircleShape = {
      id: uuid.v4(),
      x: 100,
      y: 150,
      color: 'blue',
      size: 67,
      image: require('../assets/chair1.jpg'),
      text: ' Circle Chair',
    };
    setCircleChairShapes([...circleChairShapes, newCircleShape]);
    setCircleChairCoordinates([...circleChairCoordinates, newCircleShape])
    
  };

  const removeCircleChair = (id) => {
    const filteredCircleShapes = circleChairShapes.filter((shape) => shape.id !== id);
    setCircleChairShapes(filteredCircleShapes);
    setCircleChairCoordinates(circleChairCoordinates.filter((coordinate) => coordinate.id !== id))
  };


  const addNewTable = () => {
    const newTable ={
      id:uuid.v4(), 
      x:100, 
      y:150, 
      color:'red', 
      size:100,
      image:require('../assets/table1.png')
    }
    setTableShapes([...tableShapes, newTable])
    setVerticalTableCoordinates([...verticalTableCoordinates, newTable])
  }
  
  const removeTables = (id) => {
    const filteredTableShapes = tableShapes.filter((table) => table.id !== id);
    setTableShapes(filteredTableShapes)
    setVerticalTableCoordinates(verticalTableCoordinates.filter((coordinate) => coordinate.id !== id))
  };


  const addNewHorizontalTable = () => {
    const horizontalTable = {
      id:uuid.v4(),
      x:100,
      y:150,
      color:'red',
      size:100,
      image:require('../assets/table2.png')
    }
    setHorizontalTableShapes([... horizontalTableShapes,horizontalTable])
    setHorizontalTableShapeCoordinates([...horizontalTableShapeCoordinates, horizontalTable])
  }

  const removeHorizontalTables = (id) => {
    const filteredHorizontalTableShapes = horizontalTableShapes.filter((table) => table.id !== id);
    setHorizontalTableShapes(filteredHorizontalTableShapes);
    setHorizontalTableShapeCoordinates(horizontalTableShapeCoordinates.filter((coordinate) => coordinate.id !== id));
  };


const deleteShapes = () => {
  setChairShapes([])
  setCircleChairShapes([])
  setTableShapes([])
  setHorizontalTableShapes([])
}


const saveAll = async () => {
   const layout = {
    name:name,
    address:address,
    chairs: chairShapeCoordinates,
    circleChairs:circleChairCoordinates,
    verticalTable:verticalTableCoordinates,
    horizontalTable:horizontalTableShapeCoordinates
   }

  console.log(layout)

  try{
   const ip_address = '192.168.2.20'
   const url = `http://${ip_address}:5000/api/reservedSeats`
  const response = await axios.post(url, layout)
  console.log('Response:', response.data)
  }
  catch(error){

  }
}
  const handleToggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };


  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };



  const handleOutsidePress = () => {
    setDrawerOpen(false);
  };

  const chairDrag = (e,gestureState,shape) => {
    const {pageX, pageY} = e.nativeEvent;
    const updatedCoordinates = chairShapeCoordinates.map((coordinate) => {
      if (coordinate.id == shape.id){
        const newX = coordinate.x + pageX - gestureState.x0
        const newY  = coordinate.y + pageY - gestureState.y0
      
      console.log(`Table ${shape.id} - X: ${newX}, Y: ${newY}, size:${shape.size}`);
      
      return {
        id: coordinate.id,
        x: newX,
        y: newY,  
        size:coordinate.size,
        image:coordinate.image
      };
    }
    return coordinate;
  });
  setChairShapeCoordinates(updatedCoordinates);
    
  }

  const circleChairDrag = (e,gestureState,table) => {
    const {pageX, pageY} = e.nativeEvent;
    const updatedCoordinates = circleChairCoordinates.map((coordinate) => {
      if (coordinate.id == table.id){
        const newX = coordinate.x + pageX - gestureState.x0
        const newY  = coordinate.y + pageY - gestureState.y0
      
      console.log(`Table ${table.id} - X: ${newX}, Y: ${newY}, size:${table.size}`);
      
      return {
        id: coordinate.id,
        x: newX,
        y: newY,  
        size:coordinate.size,
        image:coordinate.image
      };
    }
    return coordinate;
  });
  setCircleChairCoordinates(updatedCoordinates);
    
  }



  const regularTableDrag = (e,gestureState,table) => {
    const {pageX, pageY} = e.nativeEvent;
    const updatedCoordinates = verticalTableCoordinates.map((coordinate) => {
      if (coordinate.id == table.id){
        const newX = coordinate.x + pageX - gestureState.x0
        const newY  = coordinate.y + pageY - gestureState.y0
      
      console.log(`Table ${table.id} - X: ${newX}, Y: ${newY}, size:${table.size}`);
      
      return {
        id: coordinate.id,
        x: newX,
        y: newY,  
        size:coordinate.size,
        image:coordinate.image
      };
    }
    return coordinate;
  });
  setVerticalTableCoordinates(updatedCoordinates);
    
  }


  const horizontalTableDrag = (e,gestureState,table) => {
    const { pageX, pageY } = e.nativeEvent;
    const updatedCoordinates = horizontalTableShapeCoordinates.map((coordinate) => {
      if (coordinate.id === table.id) {
        const newX = coordinate.x + pageX -gestureState.x0;
        const newY = coordinate.y + pageY - gestureState.y0;
        console.log(`Table ${table.id} - X: ${newX}, Y: ${newY}, size:${table.size}`);
        return {
          id: coordinate.id,
          x: newX,
          y: newY,  
          size:coordinate.size,
          image:coordinate.image
        };
      }
      return coordinate;
    });
    setHorizontalTableShapeCoordinates(updatedCoordinates);
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
            <Appbar.Content title="Restaurant Layout" />
            <Appbar.Action icon="content-save-move-outline" onPress={showModal}/>
          </Appbar.Header>
          <View style={styles.draggablesContainer}></View>
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: drawerTranslateX }],
              },
            ]}
          >
            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerIte}>
              <Text>Customize Layout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addNewChair} style={styles.drawerItem}>
              <IconButton icon="seat" style={styles.drawerItemText} size={20} />
              <Text>Chair</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addNewCircleChair} style={styles.drawerItem}>
              <IconButton icon="seat" style={styles.drawerItemText} size={20} />
              <Text> Circle Chair</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addNewTable} style={styles.drawerItem}>
              <IconButton icon="table-furniture" style={styles.drawerItemText} size={20} />
              <Text> Vertical Table</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={addNewHorizontalTable} style={styles.drawerItem}>
              <IconButton icon="table-furniture" style={styles.drawerItemText} size={20} />
              <Text>Horizontal Table</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
              <IconButton icon="window-closed-variant" style={styles.drawerItemText} size={20} />
              <Text>Window</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleToggleDrawer} style={styles.drawerItem}>
              <IconButton icon="cash-register" style={styles.drawerItemText} size={20} />
              <Text>Cash Register</Text>
            </TouchableOpacity>
          </Animated.View>
          
          <View style={styles.content}>
            
            <View style={styles.draggablesContainer}>
              {Object.values(chairShapes).map((key,shape) => (
                <Draggable
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  renderSize={shape.size}
                  renderColor="transparent"
                  renderText={shape.text}
                  // onDragRelease={(e, gestureState) => {chairDrag(e, gestureState, shape) }}
                  onShortPressRelease={() => removeChair(shape.id)}
                 
                >
                  <View style={styles.chair}>
                    <Image source={shape.image} style={styles.chairImage} />
                  </View>
                </Draggable>
              ))}
{/*                 
                {circleChairShapes.map((shape) => (
                <Draggable
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  renderSize={shape.size}
                  renderColor="transparent"
                  renderText={shape.text}
                  onDragRelease={(e, gestureState) => {circleChairDrag(e, gestureState, shape) }}
                  onShortPressRelease={() => removeCircleChair(shape.id)}
                 
                >
                  <View style={styles.circlechair}>
                    <Image source={shape.image} style={styles.circleChairImage} />
                  </View>
                </Draggable>
              ))}
              
                {tableShapes.map((table) => (
                <Draggable 
                  key={table.id}
                  x={table.x}
                  y={table.y}
                  renderSize={table.size}
                  renderColor="transparent"
                  renderText={table.text}
                  onShortPressRelease={() => removeTables(table.id)}
                  onDragRelease={(e, gestureState) => {regularTableDrag(e, gestureState, table) }}
                  onPress ={ () => console.log("pressed")}
                >
                  <View style={styles.table}>
                    <Image source={table.image} style={styles.chairImage} />
                  </View>
                </Draggable>
              ))}

{horizontalTableShapes.map((table) => (
                <Draggable 
                  key={table.id}
                  x={table.x}
                  y={table.y}
                  renderSize={table.size}
                  renderColor="transparent"
                  renderText={table.text}
                  onDragRelease={(e, gestureState) => {horizontalTableDrag(e, gestureState, table) }}
                  onShortPressRelease={() => removeHorizontalTables(table.id)}
                
                >
                  <View style={styles.horizontaltable}>          
                    <Image source={table.image} style={styles.chairImage} />
                  </View>
                </Draggable>
              ))} */}
              <FormModal visible={isModalVisible} onClose={hideModal}/>

<View style={styles.overlay}>
    <TouchableOpacity onPress={deleteShapes} style={styles.overlayButton}>
      <Text style={styles.overlayButtonText}>Delete All</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={saveAll} style={styles.overlayButton}>
      <Text style={styles.overlayButtonText}>Save Layout</Text>
    </TouchableOpacity>
  </View>
              
          
          
</View>
            </View>
          </View>
        
      </TouchableWithoutFeedback>
    </PaperProvider>
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

export default AddingShape;
