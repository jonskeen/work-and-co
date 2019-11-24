import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from "helpers";
import CartProduct from 'components/CartProduct/CartProduct';
import Cta from "components/Cta/Cta"

import Add from "globals/assets/icons/add.svg";
import CartIcon from "globals/assets/icons/cart.svg";
import Remove from "globals/assets/icons/remove.svg";
import styles from "./styles.module.css";

const TAX_RATE = 0.08;

const Cart  = ({ products, total: subtotal, onCheckoutClicked }) => {
  const hasProducts = products.length > 0;
  const taxAmount = parseFloat(subtotal) * TAX_RATE;
  const total = parseFloat(subtotal) + taxAmount;

  const renderProduct = (product, i) => {
    return (
        <div className={styles.productWrapper} key={i}>
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

      {hasProducts &&
        <div>
          <div className={styles.pricing}>
            <div className={styles.pricingRow}>
              <label>Subtotal</label>
              <div className={styles.amount}>{formatCurrency(subtotal)}</div>
            </div>

            <div className={styles.pricingRow}>
              <label>Taxes</label>
              <div className={styles.amount}>{formatCurrency(taxAmount)}</div>
            </div>

            <hr />

            <div className={`${styles.pricingRow} ${styles.total}`}>
              <label>Total</label>
              <div className={styles.amount}>{formatCurrency(total)}</div>
            </div>
          </div>

          <div className={styles.checkout}>
            <Cta
                variant="rectangle"
                onClick={onCheckoutClicked}
                disabled={hasProducts}
                label="Checkout"
                fullWidth
            />
          </div>
        </div>
      }
    </div>
  )
};

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
};

export default Cart;
