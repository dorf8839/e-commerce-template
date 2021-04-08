import React from "react"
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import styles from "./Home.css";

function Home (props) {
  const { products } = props.context;

  return (
    <>
      <section className="hero is-info is-fullheight-with-navbar">
        <div className="hero-head"></div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title is-size-1">Welcome to the E-Commerce Template!</p>
            <p className="subtitle">Feel free to browse our products and submit orders for anything you would like.</p>
          </div>
        </div>
        <div className="hero-footer">
          <div className="arrow bounce">
            {/* Need to install Font Awesome to use the below arrow */}
            {/* <a className="fa fa-arrow-down fa-2x" href="#"></a> */}
            <p>Scroll down to see our delicious products!</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
            </svg>
          </div>
        </div>
      </section>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <ProductItem
                product={product}
                key={index}
                addToCart={props.context.addToCart}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default withContext(Home);