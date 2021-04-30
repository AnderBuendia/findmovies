import axios from 'axios';
import { PopularMovies } from '@Interfaces/movies/popular.interface';

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

    const modifiedData = data['results'].map((result) => ({
      id: result['id'],
      title: result['title'],
      poster: process.env.NEXT_PUBLIC_POSTER_URL + result['poster_path'],
      rating: result['vote_average'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};
