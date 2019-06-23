import React from "react";
import Product from "./Product";

const ProductList = props => {
  const products = props.products.map(product => (
    <Product
      key={product.id}
      product={product}
      handleShowActiveModal={props.handleShowActiveModal}
      handleHideActiveModal={props.handleHideActiveModal}
      handleGiveQuantity={props.handleGiveQuantity}
      handleAddToCart={props.handleAddToCart}
      shoppingCart={props.shoppingCart}
      activeModal={props.activeModal}
      activeInput={props.activeInput}
      numberOfProducts={props.numberOfProducts}
    />
  ));

  return <div className="app">{products}</div>;
};

export default ProductList;
