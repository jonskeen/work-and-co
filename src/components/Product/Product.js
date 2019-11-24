import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {addToCart} from 'actions';
import {isFunction} from 'helpers';
import Cta from 'components/Cta/Cta';

import styles from "./styles.module.css";


const Product = ({ id, price, inventory, title, addToCart }) => {
  const imageSrc = require(`globals/assets/product-images/${title.toLowerCase()}.png`);
  const hasInventory = inventory > 0;

  const handleAddToCartClicked = event => {
    if (isFunction(addToCart)) {
      addToCart(id);
    }
  };

  return (
      <div className={styles.product}>
        <div className={styles.image} style={{ backgroundImage: `url(${imageSrc})` }}>
          <div className={styles.aspectWrapper} />
        </div>

        <div className={styles.description}>
          <div className={styles.titlePriceWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.price}>${price}</div>
          </div>

          <div className={`${styles.inventory} ${!hasInventory ? styles.disabled : ""}`}>
            {hasInventory
                ? `${inventory} Remaining`
                : "Out of Stock"
            }
          </div>

          <div className={styles.ctaWrapper}>
            <Cta
                onClick={handleAddToCartClicked}
                disabled={!hasInventory}
                label="Add to cart"
            />
          </div>
        </div>

      </div>
  );
};

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { addToCart })(Product)
