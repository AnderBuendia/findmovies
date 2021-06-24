import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export type QueryPopularMoviesType = {
  queryKey: [string, { popularThisWeek: boolean }];
};

export const fetchPopularMovies = async (
  params: QueryPopularMoviesType
): Promise<DataMovies[]> => {
  const [, { popularThisWeek }] = params.queryKey;

  const url = `${publicRuntimeConfig.API_MOVIES_URL}trending/movie/${
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

    const modifiedData = await data.results.map((result: DataMovies) => ({
      id: result['id'],
      title: result['title'],
      poster: !result['poster_path']
        ? null
        : `${publicRuntimeConfig.POSTER_URL}${result['poster_path']}`,
      vote_average: result['vote_average'],
      vote_count: result['vote_count'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

const useMovies = ({ popularThisWeek }: { popularThisWeek: boolean }) => {
  return useQuery<DataMovies[], Error>(
    ['popularMovies', { popularThisWeek }],
    fetchPopularMovies
  );
};

export default useMovies;
