import React from "react"
import ProductItem from "./ProductItem";
import withContext from "../withContext";
import "./Home.css";
import bulmaCarousel from "bulma-carousel";

function Home (props) {
  const { products } = props.context;

  const options = {
    loop: true,
    autoplay: true,
    effect: "fade",
    duration: 500,
    autoplaySpeed: 5000
  }
  // Initialize all div with carousel class
  var carousels = bulmaCarousel.attach('.carousel', options);


  return (
    <>
      <div className="bannerContainer">
        <div className="banner"></div>
      </div>
      
      <section className="hero is-white is-fullheight-with-navbar">
        <div className="hero-head"></div>
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title is-size-1">Welcome to the E-Commerce Template!</p>
            <p className="subtitle">Feel free to browse our products and submit orders for anything we have in stock.</p>
          </div>
        </div>
        <div className="hero-footer">
          <div className="arrow bounce">
            <p>Scroll down to see our delicious products!</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
            </svg>
          </div>
        </div>
      </section>
      <div className="section">
        <section class="container">
          <div id="carousel" class="carousel">
            <div class="item-1">
              <img src="https://images.unsplash.com/photo-1582461833047-2aeb4f8af173?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzc2VydHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="Carousel Item #1"/>
              <p className="is-size-5 has-text-centered caption">Why not have some of our delicious fruit cupcakes!</p>
            </div>
            <div class="item-2">
              <img src="https://images.unsplash.com/photo-1616541775637-566680a1af69?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzc2VydHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="Carousel Item #2"/>
              <p className="is-size-5 has-text-centered caption">Or try a delicious caramel chocolate brownie</p>
            </div>
            <div class="item-3">
              <img src="https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZGVzc2VydHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="Carousel Item #3"/>
              <p className="is-size-5 has-text-centered caption">Perhaps some red velvet cake with cream cheese frosting?</p>
            </div>
            <div class="item-4">
              <img src="https://images.unsplash.com/photo-1614865820605-1a9f08a46117?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8ZGVzc2VydHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="Carousel Item #4"/>
              <p className="is-size-5 has-text-centered caption">A little cookie crumble pudding shots will always brighten your day</p>
            </div>
            <div class="item-5">
              <img src="https://images.unsplash.com/photo-1464347744102-11db6282f854?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8ZGVzc2VydHN8ZW58MHwwfDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60" alt="Carousel Item #5"/>
              <p className="is-size-5 has-text-centered caption">Maybe some star layered cake to lift you up to the moon!!</p>
            </div>
          </div>
        </section>
      </div>
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