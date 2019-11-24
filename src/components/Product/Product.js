import React from 'react'
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {addToCart} from 'actions';
import {isFunction} from 'helpers';
import Cta from 'components/Cta/Cta';

import styles from "./styles.module.css";


const Product = ({ id, price, inventory, title, addToCart }) => {
  const imageSrc = require(`globals/assets/product-images/${title.toLowerCase()}.png`);
  const altText = `View of the ${title} watch face`; // ideally this would be more descriptive and come along with the API
  const hasInventory = inventory > 0;

  const handleAddToCartClicked = () => {
    if (isFunction(addToCart)) {
      addToCart(id);
    }
  };

  return (
      <div className={styles.product}>
        <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageSrc})`}}
            aria-label={altText}
        />

        <div className={styles.body}>
          <div className={styles.titlePriceWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.price} tabIndex={0}>${price}</div>
          </div>

          <div className={`${styles.inventory} ${!hasInventory ? styles.disabled : ""}`} tabIndex={0}>
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
                ariaLabel={`Add ${title} to cart`}
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
