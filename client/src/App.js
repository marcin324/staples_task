import React, { Component } from "react";
import ProductList from "./ProductList";
import Form from "./Form";
import Cart from "./Cart";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      searchProducts: 0,
      searchText: "",
      activePage: 0,
      shoppingCart: 0,
      activeModal: null,
      activeInput: "",
      numberOfProducts: ""
    };
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

  handlePageChange = pageNumber => {
    this.setState({ activePage: pageNumber });
    const { searchText } = this.state;
    if (searchText.length < 3) {
      const API = "http://localhost:3005/products?_limit=140";
      fetch(API)
        .then(response => response.json())
        .then(data => {
          const lastIndex = this.state.activePage * this.itemsCountPerPage;
          const firstIndex = lastIndex - this.itemsCountPerPage;
          this.setState({
            products: data.slice(firstIndex, lastIndex)
          });
        })
        .catch(error => console.log(error));
    } else {
      const url = `http://localhost:3005/products?q=${searchText}&_limit=140`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const lastIndex = this.state.activePage * this.itemsCountPerPage;
          const firstIndex = lastIndex - this.itemsCountPerPage;
          this.setState({
            products: data.slice(firstIndex, lastIndex)
          });
        });
    }
  };

  handleSearchText = e => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { searchText } = this.state;
    if (searchText.length < 3) return;
    else {
      const url = `http://localhost:3005/products?q=${searchText}&_limit=140`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.setState({
            searchProducts: data.length
          });
          const lastIndex = this.state.activePage * this.itemsCountPerPage;
          const firstIndex = lastIndex - this.itemsCountPerPage;
          this.setState({
            products: data.slice(firstIndex, lastIndex),
            searchText: ""
          });
        });
    }
  };

  handleShowActiveModal = activeModal => {
    this.setState({
      activeModal
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

  handleNumberOfItems = (e, id) => {
    let products = [...this.state.products];
    const product = products.filter(product => product.id === id);
    this.activeInput = e.target.value;
    product[0].activeInput = this.activeInput;
    const selectedProduct = product[0];
    products.slice(id, 1, selectedProduct);
    this.setState({
      products
    });
  };

  handleAddToCart = id => {
    if (!this.activeInput || this.activeInput < 1) return;
    else {
      let products = [...this.state.products];
      const activeInput = parseInt(this.activeInput);
      this.setState(prevState => ({
        shoppingCart: prevState.shoppingCart + activeInput
      }));
      const product = products.filter(product => product.id === id);
      this.activeInput = "";
      product[0].activeInput = this.activeInput;
      const selectedProduct = product[0];
      products.slice(id, 1, selectedProduct);
      this.setState({
        products
      });
    }
  };

  render() {
    const { products } = this.state;
    return (
      <div>
        <Form
          searchText={this.state.searchText}
          handleSubmit={this.handleSubmit}
          handleSearchText={this.handleSearchText}
          onClick={this.componentDidMount.bind(this)}
        />
        <Cart shoppingCart={this.state.shoppingCart} />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.itemsCountPerPage}
          totalItemsCount={this.state.searchProducts}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        <ProductList
          products={products}
          handleShowModal={this.handleShowModal}
          handleHideModal={this.handleHideModal}
          shoppingCart={this.state.shoppingCart}
          handleNumberOfItems={this.handleNumberOfItems}
          handleAddToCart={this.handleAddToCart}
        />
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.itemsCountPerPage}
          totalItemsCount={this.state.searchProducts}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
