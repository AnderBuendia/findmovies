import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';
import { ListOfGenres } from '@Interfaces/movies/genres.interface';

export type QueryPopularMoviesType = {
  queryKey: [string, { popularDate: string }];
};

export const fetchPopularMovies = async (
  params: QueryPopularMoviesType
): Promise<DataMovies[]> => {
  const [, { popularDate }] = params.queryKey;

  const url = `${publicRuntimeConfig.API_MOVIES_URL}trending/movie/${popularDate}`;

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

export const fetchGenres = async (): Promise<ListOfGenres[]> => {
  try {
    const { data } = await axios.get(
      `${publicRuntimeConfig.API_MOVIES_URL}/genre/movie/list`,
      {
        params: {
          api_key: publicRuntimeConfig.API_KEY,
          language: 'en_US',
          page: 1,
        },
      }
    );

    const modifiedData = data.genres.slice(0, 8).map((genre) => ({
      id: genre['id'],
      name: genre['name'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

const useMovies = ({ popularDate = 'day' }: { popularDate?: string }) => {
  const findPopularMovies = useQuery<DataMovies[], Error>(
    ['popularMovies', { popularDate }],
    fetchPopularMovies
  );

  const findGenres = useQuery<ListOfGenres[], Error>(['genres'], fetchGenres);

  return {
    findPopularMovies,
    findGenres,
  };
};

export default useMovies;
