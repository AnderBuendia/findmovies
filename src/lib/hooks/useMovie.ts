import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { MovieDetail } from '@Interfaces/movies/detail.interface';

export type QueryMovieDetailType = {
  queryKey: [string, { id: string }];
};

export const fetchMovieDetail = async (
  params: QueryMovieDetailType
): Promise<MovieDetail> => {
  const [, { id }] = params.queryKey;

  try {
    const { data } = await axios.get(
      `${publicRuntimeConfig.API_MOVIES_URL}movie/${id}?`,
      {
        params: {
          api_key: publicRuntimeConfig.API_KEY,
          language: 'en_US',
        },
      }
    );

    const videoKey = await fetchMovieDetailTrailer(id);

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
      `${publicRuntimeConfig.API_MOVIES_URL}movie/${movieId}/videos?`,
      {
        params: {
          api_key: publicRuntimeConfig.API_KEY,
        },
      }
    );

    return data.results[0].key;
  } catch (error) {
    console.log(error);
  }
};

const useMovie = (movieId: string) => {
  return useQuery<MovieDetail, Error>(
    ['movieDetail', { id: movieId }],
    fetchMovieDetail
  );
};

export default useMovie;
