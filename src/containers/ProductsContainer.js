import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addToCart } from '../actions'
import { getVisibleProducts } from '../reducers/products'
import ProductItem from '../components/ProductItem/ProductItem'
import ProductsList from '../components/ProductList/ProductsList'

const ProductsContainer = ({ products, addToCart }) => (
  <ProductsList title="Products">
    {products.map(product =>
      <ProductItem key={product.id} product={product} />
    )}
  </ProductsList>
);

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  })).isRequired,
  addToCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  products: getVisibleProducts(state.products)
});

export default connect(mapStateToProps)(ProductsContainer)
