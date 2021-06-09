import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { dehydrate } from 'react-query/hydration';
import { QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useMovie, { fetchMovieDetail } from '@Lib/hooks/useMovie';
import { fetchPopularMovies } from '@Lib/hooks/useMovies';
import MovieDetailContent from '@Components/MovieDetailContent';
import MainLayout from '@Components/layouts/MainLayout';
import { GSPropsContextParams } from '@Interfaces/props/getstatic-props.interface';
import { MovieDetail } from '@Interfaces/movies/detail.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type MovieDetailPageProps = {
  movieDetail: MovieDetail;
};

const MovieDetailPage: React.FC<MovieDetailPageProps> = () => {
  const router = useRouter();
  const { id: movieId } = router.query as Record<string, string>;

  const { data, isLoading, error } = useMovie(movieId);

  console.log('ERROR', error);
  console.log('DATA', data);

  return (
    <MainLayout
      title={data.title}
      description={data.tagline}
      url={`${MainPaths.MOVIE}/${movieId}`}
    >
      <MovieDetailContent data={data} />
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const movies = await fetchPopularMovies();

  const paths = movies.map((movie) => ({
    params: { id: `${movie.id}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const { id } = ctx.params as GSPropsContextParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<MovieDetail>('movieDetail', () =>
    fetchMovieDetail(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MovieDetailPage;
