import shop from 'api/shop';
import * as types from 'constants/ActionTypes';
import { getQuantity } from 'reducers/cart';

const receiveProducts = products => ({
  type: types.RECEIVE_PRODUCTS,
  products: products,
});

export const getAllProducts = () => dispatch => {
  shop.getProducts(products => {
    dispatch(receiveProducts(products));
  });
};

const addToCartUnsafe = productId => ({
  type: types.ADD_TO_CART,
  productId,
});

export const addToCart = productId => (dispatch, getState) => {
  if (getState().products.byId[productId].inventory > 0) {
    dispatch(addToCartUnsafe(productId));
  }
};

const removeFromCartUnsafe = (productId, quantity) => ({
  type: types.REMOVE_FROM_CART,
  productId,
  quantity
});

export const removeFromCart = productId => (dispatch, getState) => {
  const state = getState();
  const quantity = getQuantity(state.cart, productId);

  if (quantity > 0) {
    dispatch(removeFromCartUnsafe(productId, quantity));
  }
};

const subtractOneFromCartUnsafe = (productId) => ({
  type: types.SUBTRACT_ONE_FROM_CART,
  productId
});

export const subtractOneFromCart = productId => (dispatch, getState) => {
  const state = getState();
  const quantity = getQuantity(state.cart, productId);

  if (quantity > 0) {
    dispatch(subtractOneFromCartUnsafe(productId));
  }
};

export const checkout = products => (dispatch, getState) => {
  const { cart } = getState();

  dispatch({
    type: types.CHECKOUT_REQUEST,
  });
  shop.buyProducts(products, () => {
    dispatch({
      type: types.CHECKOUT_SUCCESS,
      cart,
    });
  });
};
