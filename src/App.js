import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalState';
import { isAuthenticated, logout } from './DataService';
import history from './history';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProductList from './components/ProductList';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import PrivateRoute from './components/PrivateRoute';
 
const App = () => {
  return (
    <GlobalProvider>
        <Router history={history}>
            <div>
            <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container-fluid container">
                <div className="navbar-header">
                <span className="navbar-brand"><Link to="/"> Health Food Store</Link></span>
                </div>
                <ul className="navbar-nav mr-auto">
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    <Link to="/products/" className="nav-link">Products</Link>
                </li>
                <li>
                    {
                    ( isAuthenticated() ) ? <Link to="/add-product">Add Product</Link>:  ''
                    }
                </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                {
                ( isAuthenticated() ) ? 
                    ( <li onClick={logout}><a href="/">Log out</a> </li>) : 
                    ( <li><Link to="/login">Log in</Link></li> )
                }
                </ul>
            </div>
            </nav>
            <Switch>
                <Route exact path='/' component={ProductList} />  
                <Route path="/login" component={Login} />
                <Route path="/signup" render={(props) => <Signup {...props} />} />        
                <Route path="/products" component={ProductList} />
                <Route path="/products/:id" component={Product} />
                <PrivateRoute path={"add-product"} component={AddProduct} />  
                       
            </Switch>
            </div>
        </Router>
    </GlobalProvider>
  );
}
 
export default App;