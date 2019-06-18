import React from "react";

const Cart = props => {
  return (
    <div className="cart">
      <div className="cart_number">
        {props.shoppingCart}
        <i class="fas fa-shopping-cart" />
      </div>
    </div>
  );
};

export default Cart;
