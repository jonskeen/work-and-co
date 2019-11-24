import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {addToCart} from 'actions';
import {isFunction} from 'helpers';
import Cta from 'components/Cta/Cta';

import styles from "./styles.module.css";


const CartProduct = ({ id, price, title, quantity }) => {
  const imageSrc = require(`globals/assets/product-images/${title.toLowerCase()}.png`);
  const altText = `View of the ${title} watch face`; // ideally this would be more descriptive and come along with the API

  return (
      <div className={styles.product}>
        <div className={styles.image} style={{ backgroundImage: `url(${imageSrc})`}} />

        <div className={styles.body}>
          <div className={styles.titlePriceWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.price} tabIndex={0}>${price}</div>
          </div>

          <button className={styles.removeButton}>Remove</button>
        </div>
      </div>
  );
};

CartProduct.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { addToCart })(CartProduct)
