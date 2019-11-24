import React from 'react';
import PropTypes from 'prop-types';
import CartProduct from 'components/CartProduct/CartProduct';

import CartIcon from "globals/assets/icons/cart.svg";
import styles from "./styles.module.css";


const Cart  = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0;

  const nodes = hasProducts ? (
    products.map(product =>
      <CartProduct
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
      />
    )
  ) : (
    <div className={styles.emptyCart}>
      <CartIcon />
      <span className={styles.copy}>Please add some products<br /> to your cart.</span>
    </div>
  );

  return (
    <div>
      <h3 className={styles.heading}>Your Cart</h3>
      <hr />
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
};

export default Cart;
