import React from "react";

const CartForm = props => {
  return (
    <div className="cart_form">
      <form>
        <label>Quantity:</label>
        <input
          type="number"
          value={props.activeInput}
          onChange={e => props.handleNumber(e, props.product.id)}
        />
      </form>
      <button onClick={() => props.handleAddToCart(props.product.id)}>
        Add to cart
      </button>
    </div>
  );
};

export default CartForm;
