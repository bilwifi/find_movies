import axios from 'axios';

const themoviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

themoviedb.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = process.env.REACT_APP_THE_MOVIE_DB_URL;
  config.params['language'] = "fr-FR";
  return config;
});

export default themoviedb;