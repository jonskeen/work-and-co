import React from 'react';
import ProductsContainer from 'containers/Products/Products';
import CartContainer from 'containers/CartContainer';
import CartIcon from 'globals/assets/icons/cart.svg'

import styles from './styles.module.css';

const App = () => (
    <div className={styles.app}>
      <div className={styles.headline}>
        <h1>Acme Store</h1>
        <button className={`${styles.cartWrapper} ${styles.unbutton}`}>
          <CartIcon />
          Your cart is empty
        </button>
      </div>
      <hr className={styles.hRule}/>
      <ProductsContainer/>
      <hr/>
      <CartContainer/>
    </div>
);

export default App;
