import { createContext, useReducer } from "react";

export const MenuContext = createContext({
  addFoodOrder: ({ description, price }) => {},
  deleteFoodOrder: (id) => {},
  updateFoodOrder: (id, { description, price }) => {},
});
const initialFoodState = {
  foodOrder: [],
};
function menuReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      const updatableFoodIndex = state.findIndex(
        (food) => food.id == action.payload.id
      );
      const updatedFoodItem = state[updatableFoodIndex];
      const updatedMenu = [{...updatedFoodItem,...action.payload.data}];
      const updatedFoodOrders = [...state]
      updatedFoodOrders[updatableFoodIndex] = updatedMenu                       
    case "DELETE":
      return state.filter((food) => food.id !== action.payload.id);
    default:
      return state;
  }
}

function MenuContextProvider({ children }) {
  const [menuState, dispatch] = useReducer(menuReducer, initialFoodState);

  function addFoodOrder(foodData) {
    dispatch({ type: "ADD", payload: foodData });
  }

  function deleteFoodOrder(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateFoodOrder(id, foodData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: foodData } });
  }

  const value = {
    menuItems: menuState,
    addFood: addFoodOrder,
    removeFood: deleteFoodOrder,
    updateFood: updateFoodOrder,
  };

  return <MenuContextProvider value={value}>{children}</MenuContextProvider>;
}
export default MenuContextProvider;
