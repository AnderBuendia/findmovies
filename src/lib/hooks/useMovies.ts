import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { PopularMovies } from '@Interfaces/movies/popular.interface';

export type QueryPopularMoviesType = {
  queryKey: [string, { popularThisWeek: boolean }];
};

export const fetchPopularMovies = async (
  params: QueryPopularMoviesType
): Promise<PopularMovies[]> => {
  const [, { popularThisWeek }] = params.queryKey;

  const url = `${publicRuntimeConfig.API_MOVIES_URL}/trending/movie/${
    popularThisWeek ? 'week' : 'day'
  }`;

  try {
    const { data } = await axios.get(`${url}`, {
      params: {
        api_key: publicRuntimeConfig.API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    const modifiedData: PopularMovies[] = data['results'].map((result) => ({
      id: result['id'],
      title: result['title'],
      poster: publicRuntimeConfig.POSTER_URL + result['poster_path'],
      rating: result['vote_average'],
      votes: result['vote_count'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

const useMovies = ({ popularThisWeek }: { popularThisWeek: boolean }) => {
  return useQuery<PopularMovies[], Error>(
    ['popularMovies', { popularThisWeek }],
    fetchPopularMovies
  );
};

export default useMovies;
