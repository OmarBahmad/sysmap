import axios from 'axios';

export const apiBase = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})