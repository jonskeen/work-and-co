import React from 'react'
import PropTypes from 'prop-types'
import Product from 'components/Product/Product'


const ProductItem = ({ product }) => (
  <div style={{ marginBottom: 20 }}>
    <Product
      id={product.id}
      title={product.title}
      price={product.price}
      inventory={product.inventory}
    />
  </div>
);

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired
};

export default ProductItem
