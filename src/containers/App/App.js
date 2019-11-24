import React from 'react'
import ProductsContainer from 'containers/Products/Products'
import CartContainer from 'containers/CartContainer'

import styles from "./styles.module.css";


const App = () => (
  <div className={styles.app}>
    <h1>Acme Store</h1>
    <hr/>
    <ProductsContainer />
    <hr/>
    <CartContainer />
  </div>
);

export default App
