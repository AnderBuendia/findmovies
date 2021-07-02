import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export const fetchMoviesByGenre = async (q: string): Promise<any> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOVIES_URL}discover/movie`,
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
        ? `${process.env.NEXT_PUBLIC_POSTER_URL}${result['poster_path']}`
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
  return useQuery<DataMovies[], Error>(['moviesByGenre', { q }], () =>
    fetchMoviesByGenre(q)
  );
};

export default useSearchGenre;
