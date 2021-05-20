import React, { createContext, useReducer } from 'react';
import productReducer from './productReducer';

const initialState = {
  products: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
    
  function addProduct(product) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: product
    });
  }

  function editProduct(product) {
    dispatch({
      type: "EDIT_PRODUCT",
      payload: product
    });
  }

  function removeProduct(id) {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        products: state.products,
        addProduct,
        editProduct,
        removeProduct
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};