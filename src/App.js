import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import { AuthProvider } from './Context';
import AppRoute from './Components/AppRoute';
import { isAuthenticated } from './dataService';
 
const App = () => {
  return (
    <AuthProvider>
        <Router>
            <div>
            <nav className="navbar navbar-default">
            <div className="container-fluid container">
                <div className="navbar-header">
                <span className="navbar-brand"><Link to="/"> Health Food Store</Link></span>
                </div>
                <ul className="nav navbar-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/products/">Products</Link>
                </li>
                <li>
                    {
                    ( isAuthenticated() ) ? <Link to="/products/add">Add Product</Link>:  ''
                    }
                </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                {
                ( isAuthenticated() ) ? 
                    ( <li onClick={this.logOut}><a href="/">Log out</a> </li>) : 
                    ( <li><Link to="/login">Log in</Link></li> )
                }
                </ul>
            </div>
            </nav>
            <Switch>
                {routes.map((route) => (
						<AppRoute
							key={route.path}
							path={route.path}
							component={route.component}
							isPrivate={route.isPrivate}
						/>
				))}
            </Switch>
            </div>
        </Router>
    </AuthProvider>
  );
}
 
export default App;