import React from "react";
import Product from "./Product";

const ProductList = props => {
  const products = props.products.map(product => (
    <Product
      key={product.id}
      products={props.products}
      product={product}
      isActive={product.isActive}
      handleShowModal={props.handleShowModal}
      handleHideModal={props.handleHideModal}
      shoppingCart={props.shoppingCart}
      handleNumber={props.handleNumber}
      handleAddToCart={props.handleAddToCart}
      activeInput={product.activeInput}
    />
  ));

  return <div className="app">{products}</div>;
};

export default ProductList;
