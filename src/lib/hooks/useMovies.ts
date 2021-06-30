import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export const fetchPopularMovies = async (
  popularDate: string
): Promise<DataMovies[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_MOVIES_URL}trending/movie/${popularDate}`;

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
        : `${process.env.NEXT_PUBLIC_POSTER_URL}${result['poster_path']}`,
      vote_average: result['vote_average'],
      vote_count: result['vote_count'],
    }));

    return modifiedData;
  } catch (error) {
    console.log(error.message);
  }
};

const useMovies = ({ popularDate = 'day' }: { popularDate?: string }) => {
  return useQuery<DataMovies[], Error>(['popularMovies', { popularDate }], () =>
    fetchPopularMovies(popularDate)
  );
};

export default useMovies;
