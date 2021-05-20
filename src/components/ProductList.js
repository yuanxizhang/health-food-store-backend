import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const isMountedRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    fetchProducts();
    return () => isMountedRef.current = false;
  }, []);

  const fetchProducts = () => {   
    setShowLoading(true);

    const BASE_URL = 'http://localhost:3030/api/v1';

    axios.get(`${BASE_URL}/products`)
      .then(response => {
        if(isMountedRef.current){
            setProducts(response.data);
            setShowLoading(false);
        }  
      })
      .catch(e => {
        console.log('Error', e.message);
        setShowLoading(false);
      });
  };

  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Our Products</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="column columns is-multiline">
          {products && products.length ? (
            products.map((product, index) => (
              <Product
                product={product}
                key={index}
              />
            ))
          ) : (
            <div className="column">
              <span className="title has-text-grey-light">
              <br /><br />
                  {!showLoading && <p>No product data</p>}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="loading-problem">
          {showLoading && <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
          </Spinner> }
      </div>
    </>
  );
};

export default ProductList;