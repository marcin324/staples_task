import React from "react";
import CartForm from "./CartForm";

const Product = props => {
  const activeInput = props.activeInput !== "" ? props.activeInput : "";

  return (
    <div className="products">
      <div className="product_item">
        <div className="image_item img-thumbnail">
          <img
            onClick={() => props.handleShowModal(props.product.id)}
            src={props.product.images.primary.large}
            alt={props.product.general.name}
          />
        </div>
        <div className="content">
          <button
            className="btn_show_modal"
            onClick={() => props.handleShowModal(props.product.id)}
          >
            <p>{props.product.general.name}</p>
          </button>
          <p>ID: {props.product.general.presentable_id}</p>
          <CartForm
            shoppingCart={props.shoppingCart}
            handleNumber={props.handleNumber}
            handleAddToCart={props.handleAddToCart}
            product={props.product}
            products={props.products}
            activeInput={activeInput}
          />
        </div>
      </div>

      <div className={`overlay ${overlay}`}>
        <div className={`modal ${modal}`}>
          <div className="modal_content">
            <span
              className={`btn_hide ${close}`}
              onClick={() => props.handleHideModal(props.product.id)}
            >
              x
            </span>
            <div className="image">
              <img
                className={`${img}`}
                src={props.product.images.primary.large}
                alt={props.product.general.name}
              />
            </div>
            <p>{props.product.brand.name}</p>
            <p>{props.product.general.name}</p>
            <p>{description}</p>
            <p>ID: {props.product.general.presentable_id}</p>
            <CartForm
              shoppingCart={props.shoppingCart}
              handleNumber={props.handleNumber}
              handleAddToCart={props.handleAddToCart}
              product={props.product}
              products={props.products}
              activeInput={activeInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
