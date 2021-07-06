import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import axios from 'axios';
import { useQuery } from 'react-query';
import { formatIsoLanguage } from '@Lib/utils/formatCharacters';
import { UrlPaths } from '@Enums/paths/url-paths.enum';
import {
  MovieDetail,
  DataMovieCast,
  DataMovieCastDirector,
} from '@Interfaces/movies/detail-movie.interface';

export const fetchMovieDetail = async (id: string): Promise<MovieDetail> => {
  try {
    const { data } = await axios.get(`${UrlPaths.MOVIES}movie/${id}?`, {
      params: {
        api_key: publicRuntimeConfig.API_KEY,
        language: 'en_US',
      },
    });

    const videoKey = await fetchMovieDetailTrailer(id);
    const movieCast = await fetchMovieCast(id);

    const modifiedData: MovieDetail = {
      title: data.title,
      tagline: data.tagline,
      background_image: `${UrlPaths.BACKGROUND_IMAGE}${data.backdrop_path}`,
      poster_image: `${UrlPaths.POSTER_IMAGE}${data.poster_path}`,
      genres: data.genres,
      homepage: data.homepage,
      overview: data.overview,
      release_date: data.release_date,
      vote_average: data.vote_average,
      runtime: data.runtime,
      language: formatIsoLanguage(data.original_language),
      budget: data.budget,
      revenue: data.revenue,
      status: data.status,
      trailer: `${UrlPaths.YOUTUBE}${videoKey}`,
      cast: movieCast.cast,
      director: movieCast.director,
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
      `${UrlPaths.MOVIES}movie/${movieId}/videos?`,
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
      `${UrlPaths.MOVIES}movie/${movieId}/credits`,
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
        img: person['profile_path']
          ? `${UrlPaths.CHARACTER_IMAGE}${person['profile_path']}`
          : null,
      }));

    return { cast: modifiedDataCast, director: director[0].name };
  } catch (error) {
    console.log(error);
  }
};

const useMovie = ({ id }: { id: string }) => {
  return useQuery<MovieDetail, Error>(['movieDetail', { id }], () =>
    fetchMovieDetail(id)
  );
};

export default useMovie;
