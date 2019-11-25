import {
  ADD_TO_CART,
  CHECKOUT_REQUEST,
  CHECKOUT_FAILURE,
  REMOVE_FROM_CART,
  SUBTRACT_ONE_FROM_CART,
} from 'constants/ActionTypes';

const initialState = {
  addedIds: [],
  quantityById: {}
};

const addedIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (state.indexOf(action.productId) !== -1) {
        return state
      }
      return [ ...state, action.productId ];
    case REMOVE_FROM_CART:
      const index = state.indexOf(action.productId);
      const mutableState = [...state];

      if (index > -1) {
        mutableState.splice(index, 1);
        return mutableState;
      }

      return [...mutableState];
    default:
      return state
  }
};

const quantityById = (state = initialState.quantityById, action) => {
  const { productId } = action;

  switch (action.type) {
    case ADD_TO_CART:
      return { ...state,
        [productId]: (state[productId] || 0) + 1
      };
    case REMOVE_FROM_CART:
        const mutableQuantities = { ...state };
        delete mutableQuantities[productId];
        return { ...mutableQuantities };
    case SUBTRACT_ONE_FROM_CART:
      const currentQuantity = state[productId];
      return currentQuantity > 0
        ? { ...state, [productId]: state[productId] - 1 }
        : state;
    default:
      return state
  }
};

export const getQuantity = (state, productId) =>
  state.quantityById[productId] || 0;

export const getAddedIds = state => state.addedIds;

const cart = (state = initialState, action) => {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return initialState;
    case CHECKOUT_FAILURE:
      return action.cart;
    default:
      return {
        addedIds: addedIds(state.addedIds, action),
        quantityById: quantityById(state.quantityById, action)
      }
  }
};

export default cart
