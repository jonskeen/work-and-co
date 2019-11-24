import React, { Component } from 'react';
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

    return (
        <div className={styles.app}>
          <div className={styles.headline}>
            <h1>Acme Store</h1>
            <button
                className={`${styles.cartWrapper} ${styles.unbutton}`}
                onClick={() => this.setIsCartOpen(!isCartOpen)}
            >
              <CartIcon/>
              Your cart is empty
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

export default App;
