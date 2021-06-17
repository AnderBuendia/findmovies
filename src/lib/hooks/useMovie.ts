import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import {
  MovieDetail,
  DataMovieCast,
  DataMovieCastDirector,
} from '@Interfaces/movies/detail.interface';

export type QueryMovieDetailType = {
  queryKey: [string, { id: string }];
};

export const fetchMovieDetail = async (
  params: QueryMovieDetailType
): Promise<MovieDetail> => {
  const [, { id }] = params.queryKey;
  const languageNames = new (Intl as any).DisplayNames(['en'], {
    type: 'language',
  });

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
    const movieCast = await fetchMovieCast(id);

    const modifiedData: MovieDetail = {
      title: data.title,
      tagline: data.tagline,
      background_image: `https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${data.backdrop_path}`,
      poster_image: `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`,
      language: languageNames.of(data.original_language),
      genres: data.genres,
      budget: data.budget,
      homepage: data.homepage,
      overview: data.overview,
      release_date: data.release_date,
      rating: data.vote_average,
      runtime: data.runtime,
      trailer: `https://www.youtube.com/embed/${videoKey}`,
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovieDetailTrailer = async (
  movieId: string
): Promise<string> => {
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

export const fetchMovieCast = async (
  movieId: string
): Promise<DataMovieCastDirector> => {
  try {
    const { data } = await axios.get(
      `${publicRuntimeConfig.API_MOVIES_URL}movie/${movieId}/credits`,
      {
        params: {
          api_key: publicRuntimeConfig.API_KEY,
        },
      }
    );

    const director = data.crew.filter((member) => member.job === 'Director');
    const modifiedDataCast: DataMovieCast[] = data.cast
      .slice(0, 25)
      .map((person) => ({
        character: person['character'],
        name: person['name'],
        img: `https://www.themoviedb.org/t/p/w138_and_h175_face${person['profile_path']}`,
      }));

    return { cast: modifiedDataCast, director: director[0].name };
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
