import React, { Component } from "react";

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

  render() {
    return <div>fffff</div>;
  }
}

export default App;
