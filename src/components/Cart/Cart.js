import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CartProduct from 'components/CartProduct/CartProduct';
import Cta from 'components/Cta/Cta';

import Add from "globals/assets/icons/add.svg";
import CartIcon from "globals/assets/icons/cart.svg";
import Remove from "globals/assets/icons/remove.svg";
import styles from "./styles.module.css";


const Cart  = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0;

  const renderProduct = product => {
    return (
        <div className={styles.productWrapper}>
          <CartProduct
              title={product.title}
              price={product.price}
              quantity={product.quantity}
              key={product.id}
          />

          <div className={styles.buttonBar}>
            <button className={styles.halfLeft}><Add /></button>
            <div className={styles.quantity}><span>{product.quantity}</span></div>
            <button className={styles.halfRight}><Remove /></button>
          </div>

          <hr />
        </div>
    );
  };

  const nodes = hasProducts
      ? products.map(renderProduct)
      : (
    <div className={styles.emptyCart}>
      <CartIcon />
      <span className={styles.copy}>Please add some products<br /> to your cart.</span>
    </div>
  );

  return (
    <div>
      <h3 className={styles.heading}>Your Cart</h3>
      <hr />
      <div className={styles.productList}>{nodes}</div>
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
