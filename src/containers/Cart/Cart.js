import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout } from 'actions'
import { getTotal, getCartProducts } from 'reducers'
import { isFunction } from 'helpers';
import ShoppingCart from 'components/Cart/Cart'

import CloseButton from "globals/assets/icons/close.svg";
import styles from "./styles.module.css";


const Cart = ({ products, total, checkout, isOpen, onClose }) => {

  const onCloseClicked = () => {
    if (isFunction(onClose)) {
      onClose();
    }
  };

  return (
    <div className={`${styles.cart} ${isOpen ? styles.open : ""}`}>
      <div className={styles.insert}>
        <button
            className={styles.closeButton}
            aria-label="Close shopping cart"
            onClick={onCloseClicked}
        >
          <CloseButton />
        </button>
        <ShoppingCart
            products={products}
            total={total}
            onCheckoutClicked={() => checkout(products)}
        />
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
