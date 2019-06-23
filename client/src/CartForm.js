import React from "react";

const CartForm = props => {
  return (
    <div className="cart_form">
      <form>
        <label>Quantity:</label>
        <input
          type="number"
          value={
            props.product === props.activeInput ? props.numberOfProducts : ""
          }
          onChange={e => props.handleGiveQuantity(e, props.product)}
        />
      </form>
      <button onClick={() => props.handleAddToCart()}>Add to cart</button>
    </div>
  );
};

export default CartForm;
