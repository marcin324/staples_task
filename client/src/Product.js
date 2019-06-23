import React from "react";
import CartForm from "./CartForm";

const Product = ({
  product,
  activeModal,
  shoppingCart,
  handleAddToCart,
  handleGiveQuantity,
  activeInput,
  numberOfProducts,
  handleShowActiveModal,
  handleHideActiveModal
}) => {
  const modal = product === activeModal ? "show" : "";
  const overlay = product === activeModal ? "show" : "";
  const close = product === activeModal ? "btn_close" : "";
  const img = product === activeModal ? "img" : "";

  const json = product.general.description;
  const description = json.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, "");

  return (
    <div className="products">
      <div className="product_item">
        <div className="image_item img-thumbnail">
          <img
            onClick={() => handleShowActiveModal(product.id)}
            src={product.images.primary.large}
            alt={product.general.name}
          />
        </div>
        <div className="content">
          <button
            className="btn_show_modal"
            onClick={() => handleShowActiveModal(product.id)}
          >
            <p>{product.general.name}</p>
          </button>
          <p>ID: {product.general.presentable_id}</p>
          <CartForm
            product={product}
            handleGiveQuantity={handleGiveQuantity}
            handleAddToCart={handleAddToCart}
            shoppingCart={shoppingCart}
            activeInput={activeInput}
            numberOfProducts={numberOfProducts}
          />
        </div>
      </div>

      <div className={`overlay ${overlay}`}>
        <div className={`modal ${modal}`}>
          <div className="modal_content">
            <span
              className={`btn_hide ${close}`}
              onClick={() => handleHideActiveModal(product.id)}
            >
              x
            </span>
            <div className="image">
              <img
                className={`${img}`}
                src={product.images.primary.large}
                alt={product.general.name}
              />
            </div>
            <p>{product.brand.name}</p>
            <p>{product.general.name}</p>
            <p>{description}</p>
            <p>ID: {product.general.presentable_id}</p>
            <CartForm
              product={product}
              handleGiveQuantity={handleGiveQuantity}
              handleAddToCart={handleAddToCart}
              shoppingCart={shoppingCart}
              activeInput={activeInput}
              numberOfProducts={numberOfProducts}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
