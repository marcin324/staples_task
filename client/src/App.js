import React, { Component } from "react";
import ProductList from "./ProductList";

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
        console.log(data);
        this.setState({
          searchProducts: data.length,
          activePage: 1
        });
        console.log(this.state.searchProducts);
        const lastIndex = this.state.activePage * this.itemsCountPerPage;
        const firstIndex = lastIndex - this.itemsCountPerPage;
        this.setState({
          products: data.slice(firstIndex, lastIndex)
        });
      })
      .catch(error => console.log(error));
  }

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
