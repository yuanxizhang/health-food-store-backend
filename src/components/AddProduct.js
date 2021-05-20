import React, { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { isAuthenticated, addProduct } from '../DataService';

const AddProduct = () => {
  let history = useHistory();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [instock, setInstock] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {id: uuid(), name: name, brand: brand, discription: description }
    addProduct(product); 
    history.push('/')
    setName('');
    setBrand('');
    setDescription('');
    setInstock(0);
  };

  return !( isAuthenticated() )? (
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
        <form onSubmit={handleSubmit}>
          <div className="columns is-mobile is-centered">
            <div className="column is-one-third">
              <div className="field">
                <label className="label">Product Name: </label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="field">
                <label className="label">Brand: </label>
                <input
                  className="input"
                  type="text"
                  name="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
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
                  onChange={(e) => setInstock(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="label">Description: </label>
                <input
                  className="input"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              
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


export default AddProduct;