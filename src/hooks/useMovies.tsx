import {useEffect, useState} from 'react';
import movieDB from '../api/movieDB';
import {Movie, MovieDBMoviesResponse} from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  //debo inicializarlas con un arreglo vacio para que siempre tengan algo
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const popularPromise = movieDB.get<MovieDBMoviesResponse>('/popular');
    const nowPlayingPromise =
      movieDB.get<MovieDBMoviesResponse>('/now_playing');
    const topRatedPromise = movieDB.get<MovieDBMoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBMoviesResponse>('/upcoming');

    const resps = await Promise.all([
      popularPromise,
      nowPlayingPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: resps[0].data.results,
      popular: resps[1].data.results,
      topRated: resps[2].data.results,
      upcoming: resps[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    //now playing
    getMovies();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
