import React, { Component } from "react";
import ProductList from "./ProductList";
import Form from "./Form";
import Cart from "./Cart";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchProducts: 0,
      searchText: "",
      activePage: 0,
      shoppingCart: 0
    };
    this.activeInput = "";
    this.isActive = "";
    this.itemsCountPerPage = 10;
  }

  componentDidMount() {
    const API = `http://localhost:3005/products?_limit=140`;
    fetch(API)
      .then(response => {
        if (response.status === 200) {
          return response;
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          searchProducts: data.length,
          activePage: 1
        });
        const lastIndex = this.state.activePage * this.itemsCountPerPage;
        const firstIndex = lastIndex - this.itemsCountPerPage;
        this.setState({
          products: data.slice(firstIndex, lastIndex)
        });
      })
      .catch(error => console.log(error));
  }

  handleShowModal = id => {
    let products = [...this.state.products];
    const product = products.filter(product => product.id === id);
    product[0].isActive = true;
    const selectedProduct = product[0];
    products.slice(id, 1, selectedProduct);
    this.setState({
      products
    });
  };

  handleHideModal = id => {
    let products = [...this.state.products];
    const product = products.filter(product => product.id === id);
    product[0].isActive = "";
    const selectedProduct = product[0];
    products.slice(id, 1, selectedProduct);
    this.setState({
      products
    });
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Form
          searchText={this.state.searchText}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          onClick={this.componentDidMount.bind(this)}
        />
        <Cart shoppingCart={this.state.shoppingCart} />
        <ProductList
          products={products}
          handleShowModal={this.handleShowModal}
          handleHideModal={this.handleHideModal}
          shoppingCart={this.state.shoppingCart}
          handleNumber={this.handleNumber}
          handleAddToCart={this.handleAddToCart}
        />
      </div>
    );
  }
}

export default App;
