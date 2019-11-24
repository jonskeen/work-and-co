import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getVisibleProducts } from 'reducers/products'
import ProductItem from 'components/ProductItem/ProductItem'

import styles from "./styles.module.css"


const Products = ({ products }) => (
  <ul className={styles.productList}>
    {products.map(product => (
        <li key={product.id}>
          <ProductItem product={product} />
        </li>
      ))}
  </ul>
);

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
};

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
});

export default connect(mapStateToProps)(Products)
