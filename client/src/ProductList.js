import React from "react";
import Product from "./Product";

const ProductList = props => {
  const products = props.products.map(product => (
    <Product
      key={product.id}
      product={product}
      shoppingCart={props.shoppingCart}
      handleAddToCart={props.handleAddToCart}
      handleShowActiveModal={props.handleShowActiveModal}
      handleHideActiveModal={props.handleHideActiveModal}
      activeModal={props.activeModal}
      handleGiveQuantity={props.handleGiveQuantity}
      activeInput={props.activeInput}
      numberOfProducts={props.numberOfProducts}
    />
  ));

  return <div className="app">{products}</div>;
};

export default ProductList;
