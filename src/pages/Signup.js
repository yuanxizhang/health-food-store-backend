import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import Axios from 'axios';
import history from '../history';

class Signup extends Component {
  
  state = { 
      id: null,
      name: '',
      email: '',
      password: '',
      isadmin: false
  };

  handleChange = (event) => {
      
      this.setState({
        [event.target.name]: event.target.value
      })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const newUser = 
      {"user": {id: uuid(),  
              name: this.state.name,
              email: this.state.email,
              isadmin: this.state.isadmin
      }};
    Axios.post('http://localhost:3030/api/v1/users', newUser)
      .then(response => {
        localStorage.setItem("token", response.data.jwt);
        localStorage.setItem('token-expiration', Date.now() + 2 * 60 * 60 * 1000);
        localStorage.setItem("user", response.data.user);
        history.push("/");
      })
      .catch(error => console.log('error', error));
  };

  render() {
    const {name, email, password } = this.state

    return (
      <div className="container-sm border"> 
        <h3>Sign Up</h3>        
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label>Name</label>
              <input
                placeholder="name"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
          </div>
          <div className="form-group">
              <label>Email address</label>
              <input
                  placeholder="email"
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
              />
          </div>
          <div className="form-group">
              <label>Password</label>
              <input 
                placeholder="password"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
          </div> 
        
          <button placeholder="submit" type="submit" className="btn btn-primary btn-block" >
            Sign Up
          </button>
          <p className="text-right">
              Already registered? <Link to='/login'>Log in</Link>
          </p>
        </form>
      </div>
    );
  }
}
export default Signup
