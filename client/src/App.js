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

  handleHideActiveModal = () => {
    this.setState({
      activeModal: null
    });
  };

  handleGiveQuantity = (e, activeInput) => {
    const numberOfProducts = e.target.value;
    this.setState({
      activeInput,
      numberOfProducts
    });
  };

  handleAddToCart = () => {
    const { numberOfProducts } = this.state;
    if (numberOfProducts < 1) return;
    else {
      const number = parseInt(numberOfProducts);
      this.setState(prevState => ({
        shoppingCart: prevState.shoppingCart + number,
        activeInput: "",
        numberOfProducts: ""
      }));
    }
  };

  render() {
    const {
      searchText,
      shoppingCart,
      activePage,
      searchProducts,
      activeModal,
      activeInput,
      numberOfProducts,
      products
    } = this.state;
    return (
      <div>
        <Form
          searchText={searchText}
          handleSubmit={this.handleSubmit}
          handleSearchText={this.handleSearchText}
          onClick={this.componentDidMount.bind(this)}
        />
        <Cart shoppingCart={shoppingCart} />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={this.itemsCountPerPage}
          totalItemsCount={searchProducts}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        <ProductList
          products={products}
          handleShowActiveModal={this.handleShowActiveModal}
          handleHideActiveModal={this.handleHideActiveModal}
          handleGiveQuantity={this.handleGiveQuantity}
          handleAddToCart={this.handleAddToCart}
          shoppingCart={shoppingCart}
          activeModal={activeModal}
          activeInput={activeInput}
          numberOfProducts={numberOfProducts}
        />
        <Pagination
          activePage={activePage}
          itemsCountPerPage={this.itemsCountPerPage}
          totalItemsCount={searchProducts}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;
