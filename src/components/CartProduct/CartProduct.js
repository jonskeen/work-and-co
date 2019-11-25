import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {addToCart, removeFromCart} from 'actions';

import styles from "./styles.module.css";


const CartProduct = ({ id, price, title, removeFromCart }) => {
  const imageSrc = require(`globals/assets/product-images/${title.toLowerCase()}.png`);

  const handleRemoveClicked = () => {
    removeFromCart(id);
  };

  return (
      <div className={styles.product}>
        <div className={styles.image} style={{ backgroundImage: `url(${imageSrc})`}}>
          <div style={{ paddingBottom: "56%" }} />
        </div>

        <div className={styles.body}>
          <div className={styles.titlePriceWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.price} tabIndex={0}>${price}</div>
          </div>

          <button className={styles.removeButton} onClick={handleRemoveClicked}>Remove</button>
        </div>
      </div>
  );
};

CartProduct.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

export default connect(null, {
  addToCart,
  removeFromCart
})(CartProduct)
