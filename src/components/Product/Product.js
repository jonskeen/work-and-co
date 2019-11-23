import React from 'react'
import PropTypes from 'prop-types'

import styles from "./styles.module.css";


const Product = ({ price, inventory, title }) => {
  const imageSrc = require(`globals/assets/product-images/${title.toLowerCase()}.png`);
  const hasInventory = inventory > 0;

  return (
      <div className={styles.product}>
        <div className={styles.image} style={{ backgroundImage: `url(${imageSrc})` }}>
          <div className={styles.aspectWrapper} />
        </div>

        <div className={styles.description}>
          <div className={styles.titlePriceWrapper}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.price}>{price}</div>
          </div>

          <div className={`${styles.inventory} ${!hasInventory ? styles.disabled : ""}`}>
            {hasInventory
                ? `${inventory} Remaining`
                : "Out of Stock"
            }
          </div>
        </div>

      </div>
  );
};

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string
};

export default Product
