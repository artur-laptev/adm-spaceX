import { SET_SHIPMENTS, UPDATE_SHIPMENT, SAVE_SHIPMENTS, STORAGE_KEY } from "./actionsTypes";

function loadlLocalShipments() {
  return new Promise(resolve => {
    const shipments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    resolve(shipments)
  });
}

function loadShipments() {
  return new Promise(resolve => {
    import('../shipments.json').then(module => resolve(module.default))
  });
}

export function getLocalShipments() {
  return dispatch => {
    return loadlLocalShipments()
      .then(data => {
        dispatch(setShipments(data))
        return data
      })
  };
}

export function getShipments() {
  return dispatch => {
    return loadShipments()
      .then(data => {
        dispatch(setShipments(data))
        return data
      })
  };
}

const setShipments = items => ({
  type: SET_SHIPMENTS,
  payload: { items }
});

export const saveShipments = () => ({
  type: SAVE_SHIPMENTS
});

export const updateShipment = item => ({
  type: UPDATE_SHIPMENT,
  payload: { item }
});
