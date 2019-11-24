import { isNonEmptyArray } from "helpers";

const TIMEOUT = 100

const getProducts = (cb) => {
  const endpoint = "http://tech.work.co/shopping-cart/products.json";

  fetch(endpoint)
    .then(async result => {
      if (!result.ok) {
        throw Error("Unable to fetch products");
      }

      return await result.json();
    })
    .then(products => {
      const mapProducts = () => products.map(product => ({
        id: product.id,
        title: product.productTitle,
        price: product.price.value,
        inventory: product.inventory
      }));

      const formattedProducts = isNonEmptyArray(products)
        ? mapProducts()
        : [];

      cb(formattedProducts);
  });
};

export default {
  getProducts,
  buyProducts: (payload, cb, timeout) => setTimeout(() => cb(), timeout || TIMEOUT)
}
