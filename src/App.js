import React, { Component } from "react";
import { Switch, Route, Link, BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

import Context from "./Context";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }

  async componentDidMount() {
    let user = localStorage.getItem("user");
    let cart = localStorage.getItem("cart");

    const products = await axios.get("http://localhost:3001/products");
    user = user ? JSON.parse(user) : null;
    cart = cart ? JSON.parse(cart) : {};

    this.setState({ user, products: products.data, cart });
  }

  login = async (email, password) => {
    const res = await axios.post(
      "http://localhost:3001/login",
      { email, password },
    ).catch((res) => {
      return { status: 401, message: "Unauthorized" }
    })
    /*For a more robust solution to prevent a user from changing their access
    level in the client, a second request could be made to get the user's
    permissions when a user logins in, or whenver the app loads.*/
    if (res.status === 200) {
      const { email } = jwt_decode(res.data.accessToken);
      const user = {
        email,
        token: res.data.accessToken,
        accessLevel: email === "admin@example.com" ? 0 : 1
      }

      this.setState({ user });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout = e => {
    e.preventDefault();
    this.setState({ user: null });
    localStorage.removeItem("user");
  };

  addProduct = (product, callback) => {
    let products = this.state.products.slice();
    products.push(product);
    this.setState({ products }, () => callback && callback());
  };

  addToCart = cartItem => {
    let cart = this.state.cart;
    if (cart[cartItem.id]) {
      cart[cartItem.id].amount += cartItem.amount;
    } else {
      cart[cartItem.id] = cartItem;
    }
    if (cart[cartItem.id].amount > cart[cartItem.id].product.stock) {
      cart[cartItem.id].amount = cart[cartItem.id].product.stock;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  removeFromCart = cartItemId => {
    let cart = this.state.cart;
    delete cart[cartItemId];
    localStorage.setItem("cart", JSON.stringify(cart));
    this.setState({ cart });
  };

  clearCart = () => {
    let cart = {};
    localStorage.removeItem("cart");
    this.setState({ cart });
  };

  checkout = () => {
    if (!this.state.user) {
      this.routerRef.current.history.push("/login");
      return;
    }

    const cart = this.state.cart;

    const products = this.state.products.map(p => {
      if (cart[p.name]) {
        p.stock = p.stock - cart[p.name].amount;

        axios.put(
          `http://localhost:3001/products/${p.id}`,
          { ...p },
        )
      }
      return p;
    });

    this.setState({ products });
    this.clearCart();
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          removeFromCart: this.removeFromCart,
          addToCart: this.addToCart,
          login: this.login,
          addProduct: this.addProduct,
          clearCart: this.clearCart,
          checkout: this.checkout
        }}
      >
        <Router ref={this.routerRef}>
          <div className="App">
            <nav
              className="navbar container is-fluid"
              role="navigation"
              aria-label="main navigation"
            >
              <div className="navbar-brand">
                <Link to="/" className="navbar-item pt-1">
                  <img alt="" src="avatar.png" width="35" height="14"/>
                  <b className="is-size-4 pl-2">E-Commerce Template</b>
                </Link>               
                <label
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ showMenu: !this.state.showMenu });
                  }}
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </label>
              </div>
              <div className={`navbar-menu ${this.state.showMenu ? "is-active" : ""}`}>
                <div className="navbar-start">
                  <Link to="/products" className="navbar-item">
                    Products
                  </Link>
                  {this.state.user && this.state.user.accessLevel < 1 && (
                    <Link to="/add-product" className="navbar-item">
                      Add Product
                    </Link>
                  )}
                </div>
                <div className="navbar-end">
                  <Link to="/cart" className="navbar-item">
                    Cart
                    <span
                      className="tag is-primary"
                      style={{ marginLeft: "5px" }}
                    >
                      {Object.keys(this.state.cart).length}
                    </span>
                  </Link>
                  {!this.state.user ? (
                    <Link to="/login" className="navbar-item">
                      <div class="buttons">
                        <button class="button is-primary">
                          Login
                        </button>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/" onClick={this.logout} className="navbar-item">
                      <div class="buttons">
                        <button class="button is-danger is-light">
                          Logout
                        </button>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/add-product" component={AddProduct} />
              <Route exact path="/products" component={ProductList} />
            </Switch>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}
