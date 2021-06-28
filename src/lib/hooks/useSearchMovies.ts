import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export type QuerySearchMoviesType = {
  queryKey: [string, { q: string }];
};

export const fetchSearchMovies = async (
  params: QuerySearchMoviesType
): Promise<DataMovies[]> => {
  const [, { q }] = params.queryKey;
  const url = `${publicRuntimeConfig.API_MOVIES_URL}search/movie`;

  try {
    const { data } = await axios.get(`${url}`, {
      params: {
        api_key: publicRuntimeConfig.API_KEY,
        language: 'en-US',
        page: 1,
        query: q.toLowerCase(),
        include_adult: false,
      },
    });

    const modifiedData = await data.results.map((result: DataMovies) => ({
      id: result.id,
      title: result['title'],
      poster: !result['poster_path']
        ? `${publicRuntimeConfig.POSTER_URL}${result['poster_path']}`
        : null,
      vote_average: result.vote_average,
      vote_count: result.vote_count,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

const useSearchMovies = ({ q }: { q: string }) => {
  return useQuery<DataMovies[], Error>(
    ['searchMovies', { q }],
    fetchSearchMovies
  );
};

export default useSearchMovies;
