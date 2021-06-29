import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { QuerySearchMoviesType } from '@Lib/hooks/useSearchMovies';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export const fetchMoviesByGenre = async (
  params: QuerySearchMoviesType
): Promise<any> => {
  const [, { q }] = params.queryKey;

  try {
    const { data } = await axios.get(
      `${publicRuntimeConfig.API_MOVIES_URL}discover/movie`,
      {
        params: {
          api_key: publicRuntimeConfig.API_KEY,
          language: 'en_US',
          page: 1,
          with_genres: q,
        },
      }
    );

    const modifiedData = await data.results.map((result: DataMovies) => ({
      id: result.id,
      title: result['title'],
      poster: result['poster_path']
        ? `${publicRuntimeConfig.POSTER_URL}${result['poster_path']}`
        : null,
      vote_average: result.vote_average,
      vote_count: result.vote_count,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

const useSearchGenre = ({ q = null }: { q?: string }) => {
  return useQuery<DataMovies[], Error>(
    ['moviesByGenre', { q }],
    fetchMoviesByGenre
  );
};

export default useSearchGenre;