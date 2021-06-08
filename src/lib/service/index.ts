import axios from 'axios';
import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MovieDetail } from '@Interfaces/movies/detail.interface';

export const fetchPopularMovies = async (): Promise<PopularMovies[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.API_MOVIES_URL}movie/popular`,
      {
        params: {
          api_key: process.env.API_KEY,
          language: 'en-US',
          page: 1,
        },
      }
    );

    const modifiedData: PopularMovies[] = data['results'].map((result) => ({
      id: result['id'],
      title: result['title'],
      poster: process.env.NEXT_PUBLIC_POSTER_URL + result['poster_path'],
      rating: result['vote_average'],
      votes: result['vote_count'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchMovieDetail = async (
  movieId: string
): Promise<MovieDetail> => {
  try {
    const { data } = await axios.get(
      `${process.env.API_MOVIES_URL}movie/${movieId}?`,
      {
        params: {
          api_key: process.env.API_KEY,
          language: 'en_US',
        },
      }
    );

    const videoKey = await fetchMovieDetailTrailer(movieId);

    const modifiedData: MovieDetail = {
      title: data.title,
      tagline: data.tagline,
      background_image: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`,
      poster_image: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`,
      genres: data.genres,
      budget: data.budget,
      homepage: data.homepage,
      overview: data.overview,
      release_date: data.release_date,
      rating: data.vote_average,
      runtime: data.runtime,
      trailer: `https://www.youtube.com/watch?v=${videoKey}`,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetailTrailer = async (movieId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.API_MOVIES_URL}movie/${movieId}/videos?`,
      {
        params: {
          api_key: process.env.API_KEY,
        },
      }
    );

    return data.results[0].key;
  } catch (error) {
    console.log(error);
  }
};
