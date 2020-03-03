import { SET_SHIPMENTS, UPDATE_SHIPMENT, SAVE_SHIPMENTS, STORAGE_KEY } from "../actions/actionsTypes";

const initialState = {
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SHIPMENTS: {
      return {
        ...state,
        items: action.payload.items
      };
    }
    case UPDATE_SHIPMENT: {
      const { item } = action.payload
      const index = state.items.findIndex(i => i.id === item.id);
      if (index !== -1) {
        state.items.splice(index, 1, {...state.items[index], ...item});
      }
      return { ...state }
    }
    case SAVE_SHIPMENTS: {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
      return {
        ...state
      };
    }
    default: {
      return { ...state };
    }
  }
};
