import axios from 'axios';
import { Redirect } from 'react-router-dom'

const BASE_URL = 'http://localhost:3030';
const token = JSON.parse(localStorage.getItem('token'));

export function getProducts () {
 return axios.get(`${BASE_URL}/api/v1/products`)
 .then(response => response.data);
 }

export function getProductDetail (id) {
    return axios.get(`${BASE_URL}/api/v1/products/${id}`)
    .then(response => response.data);
    } 

export function addProduct (id, data) {
 return axios.post(`${BASE_URL}/api/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
 .then(response => response.data)
 .catch(err => Promise.reject('Request Not Authenticated!'));
 }

export function updateProduct (id, data) {
    return axios.put(`${BASE_URL}/api/products/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => response.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
}

export function login (data) {
 return axios.post(`${BASE_URL}/api/v1/login`, { user: {email: data.email, password: data.password} })
 .then(response => {
    localStorage.setItem('user', response.data.user);
    localStorage.setItem('token', response.data.jwt);
    localStorage.setItem('token-expiration', Date.now() + 2 * 60 * 60 * 1000);
 return response.data
 })
 .catch(err => Promise.reject('Authentication Failed!'));
 }

 export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token-expiration');
    localStorage.removeItem('user');
    return <Redirect to='/' />
  }

export function isAuthenticated(){
 return localStorage.getItem('token') && localStorage.getItem('token-expiration') > Date.now()
 }