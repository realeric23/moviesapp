import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '6d24f57973d6131c8be6cd14b55b0718',
    language: 'es-ES',
  },
});

export default movieDB;
