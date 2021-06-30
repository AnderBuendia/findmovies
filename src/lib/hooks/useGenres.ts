import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { ListOfGenres } from '@Interfaces/movies/genres.interface';

export const fetchGenres = async (): Promise<ListOfGenres[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_MOVIES_URL}/genre/movie/list`,
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

const useGenres = () => {
  return useQuery<ListOfGenres[], Error>(['genres'], fetchGenres);
};

export default useGenres;
