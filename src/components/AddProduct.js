import React, { useState } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from "axios";

function AddProduct(props) {
  const [initState, setInitState] = useState({ name: "", price: "", stock: "", shortDesc: "", description: "" });
  const [message, setMessage] = useState("");
  const { user } = props.context;

  async function save(e) {
    e.preventDefault();
    const { name, price, stock, shortDesc, description } = initState;
    if (name && price) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        "http://localhost:3001/products",
        { id, name, price, stock, shortDesc, description },
      )

      props.context.addProduct(
        {
          name,
          price,
          shortDesc,
          description,
          stock: stock || 0
        },
        () => setInitState({ name: "", price: "", stock: "", shortDesc: "", description: "" })
      );
      setMessage(
        { flash: { status: "is-success", msg: "Product created successfully" } }
      );
    } else {
      setMessage(
        { flash: { status: "is-danger", msg: "Please enter name and price" } }
      );
    }
  };

  function handleChange(e) {
    setInitState({ ...initState, [e.target.name]: e.target.value, error: "" });
  };

  return !(user && user.accessLevel < 1) ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Add Product</h4>
        </div>
      </div>
      <br />
      <br />
      <form onSubmit={save}>
        <div className="columns is-mobile is-centered">
          <div className="column is-one-third">
            {message.flash && (
              <div className={`notification ${message.flash.status}`}>
                {message.flash.msg}
              </div>
            )}
            <div className="field">
              <label className="label">Product Name: </label>
              <input
                className="input"
                type="text"
                name="name"
                value={initState.name}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Price: </label>
              <input
                className="input"
                type="number"
                name="price"
                value={initState.price}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="field">
              <label className="label">Available in Stock: </label>
              <input
                className="input"
                type="number"
                name="stock"
                value={initState.stock}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field">
              <label className="label">Short Description: </label>
              <input
                className="input"
                type="text"
                name="shortDesc"
                value={initState.shortDesc}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field">
              <label className="label">Description: </label>
              <textarea
                className="textarea"
                type="text"
                rows="2"
                style={{ resize: "none" }}
                name="description"
                value={initState.description}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="field is-clearfix">
              <button
                className="button is-primary is-outlined is-pulled-right"
                type="submit"
                onClick={save}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default withContext(AddProduct);
