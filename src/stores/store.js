import { defineStore } from 'pinia'
import axios from "axios"


export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    moviesVidio:[],
    isLoading :false,
    query:'',
    idTampung:'315162',
  }),
  getters: {
    getMovies(state) {
      return state.movies
    },
  },
  actions: {
    async fetchMovies() {
      try {
        this.isLoading =true;
        const movies = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a34deb20e0aeeb3f09a5d1efb2ee73ad');
        this.movies = movies.data.results
        this.isLoading = false;
      }
      catch (error) {
        console.log(error)
      }
    },
    async fetchSearchMovies() {
      try {
        const movies = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${this.query}&api_key=a34deb20e0aeeb3f09a5d1efb2ee73ad`);
        this.movies = movies.data.results
      }
      catch (error) {
        console.log(error)
      }
    },
    async fetchVidioMovies() {
      try {
        const moviesVidio = await axios.get(`https://api.themoviedb.org/3/movie/${this.idTampung}/videos?api_key=a34deb20e0aeeb3f09a5d1efb2ee73ad`);
        this.moviesVidio = moviesVidio.data.results
      }
      catch (error) {
        console.log(error)
      }
    },
    async fetchTrendingMovies() {
      try {
        const moviesVidio = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=a34deb20e0aeeb3f09a5d1efb2ee73ad`);
        this.moviesVidio = moviesVidio.data.results
      }
      catch (error) {
        console.log(error)
      }
    },

    flim(id){
      this.idTampung = id;
    },
  }
})
