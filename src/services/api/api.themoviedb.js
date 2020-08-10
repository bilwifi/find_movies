import axios from 'axios';

const themoviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

themoviedb.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = "b4818c4ab97c0b557b8bd67e03e01217";
  config.params['language'] = "fr-FR";
  return config;
});

export default themoviedb;