import React, { Component } from "react";
import withContext from "../withContext";
import { Redirect } from "react-router-dom";
import axios from 'axios';

const initialState = {
  name: "",
  brand: "",
  description: "",
  instock: 0,
};

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  save = async (e) => {
    e.preventDefault();
    const { name, brand, description, instock } = this.state;

    if (name) {
      const id = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await axios.post(
        'http://localhost:3030/products',
        { id, name, brand, description, instock },
      )

      this.props.context.addProduct(
        {
          name,
          brand,
          description,
          instock: instock || 0
        },
        () => this.setState(initialState)
      );
      this.setState(
        { flash: { status: 'is-success', msg: 'Product added successfully' }}
      );

    } else {
      this.setState(
        { flash: { status: 'is-danger', msg: 'Please enter name and price' }}
      );
    }
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: "" });

  render() {
    const { name, brand, description, instock } = this.state;
    const { user } = this.props.context;

    return !(user && user.isadmin) ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="hero is-primary ">
          <div className="hero-body container">
            <h4 className="title">Add Product</h4>
          </div>
        </div>
        <br />
        <br />
        <form onSubmit={this.save}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Brand: </label>
                <input
                  className="input"
                  type="text"
                  name="brand"
                  value={Brand}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Available in Stock: </label>
                <input
                  className="input"
                  type="number"
                  name="instock"
                  value={instock}
                  onChange={this.handleChange}
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <input
                  className="input"
                  type="text"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                />
              </div>
              
              {this.state.flash && (
                <div className={`notification ${this.state.flash.status}`}>
                  {this.state.flash.msg}
                </div>
              )}
              <div className="field is-clearfix">
                <button
                  className="button is-primary is-outlined is-pulled-right"
                  type="submit"
                  onClick={this.save}
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
}

export default withContext(AddProduct);