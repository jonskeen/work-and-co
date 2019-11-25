import React, { Component } from 'react';
import { connect } from "react-redux";
import ProductsContainer from 'containers/Products/Products';
import CartContainer from 'containers/Cart/Cart';
import CartIcon from 'globals/assets/icons/cart.svg'

import styles from './styles.module.css';

class App extends Component {

  state = {
    isCartOpen: false
  };

  setIsCartOpen = bool => {
    this.setState({isCartOpen: bool})
  };

  onKeyUp = event => {
    const { isCartOpen } = this.state;

    if (event.keyCode === 27 && isCartOpen) {
      this.setIsCartOpen(false);
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.onKeyUp);
  }

  render() {
    const { isCartOpen } = this.state;
    const { itemQuantities } = this.props;
    const totalItems = Object.values(itemQuantities).reduce((total, num) => {
      return total + num;
    }, 0);

    return (
        <div className={styles.app}>
          <div className={styles.headline}>
            <h1 className={styles.header}><a href="/">Acme Store</a></h1>
            <button
                className={`${styles.cartWrapper} ${styles.unbutton}`}
                onClick={() => this.setIsCartOpen(!isCartOpen)}
            >
              <CartIcon/>
              <span>
                {totalItems > 0
                    ? `${totalItems} item${totalItems > 1 ? "s" : ""} in cart`
                    : "Your cart is empty"
                }
              </span>
            </button>
          </div>
          <hr className={styles.hRule}/>
          <ProductsContainer/>
          <hr/>
          <CartContainer isOpen={isCartOpen} onClose={() => this.setIsCartOpen(false)}/>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  itemQuantities: state.cart.quantityById
});

export default connect(mapStateToProps)(App);
