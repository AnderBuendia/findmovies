import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import { dehydrate } from 'react-query/hydration';
import { QueryClient, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { fetchMovieDetail, fetchPopularMovies } from '@Lib/service';
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
  const { id: movieId } = router.query;
  const { data, isLoading, error } = useQuery<MovieDetail>('movieDetail', {
    staleTime: Infinity,
  });

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

  await queryClient.prefetchQuery<MovieDetail>(
    'movieDetail',
    () => fetchMovieDetail(id),
    {
      staleTime: Infinity,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MovieDetailPage;
