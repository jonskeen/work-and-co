import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from 'actions'
import { getTotal, getCartProducts } from 'reducers'
import {isFunction, isNonEmptyArray} from 'helpers';
import ShoppingCart from 'components/Cart/Cart'
import Cta from 'components/Cta/Cta';

import CloseButton from "globals/assets/icons/close.svg";
import styles from "./styles.module.css";


const Cart = ({ products, total, checkout, isOpen, onClose }) => {
  const hasProducts = isNonEmptyArray(products);
  const hasProductsWithCounts = hasProducts && products.some(product => product.quantity > 0);

  const onCloseClicked = () => {
    if (isFunction(onClose)) {
      onClose();
    }
  };

  return (
    <div className={`${styles.cart} ${isOpen ? styles.open : ""}`}>
      <div className={styles.insert}>
        <div className={styles.closeButtonWrapper}>
          <button
              className={styles.closeButton}
              aria-label="Close shopping cart"
              onClick={onCloseClicked}
          >
            <CloseButton />
          </button>
        </div>
        <ShoppingCart products={products} total={total} />

        {hasProducts &&
        <div className={styles.checkout}>
          <Cta
              variant="rectangle"
              onClick={() => checkout(products)}
              disabled={!hasProductsWithCounts}
              label="Checkout"
              fullWidth
          />
        </div>
        }
      </div>
    </div>
  )
};

Cart.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
});

export default connect(
  mapStateToProps,
  { checkout }
)(Cart)
