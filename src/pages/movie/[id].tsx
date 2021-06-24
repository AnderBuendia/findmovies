import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate } from 'react-query/hydration';
import { QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useMovie, { fetchMovieDetail } from '@Lib/hooks/useMovie';
import MovieDetailContent from '@Components/movie/MovieDetailContent';
import MainLayout from '@Components/layouts/MainLayout';
import { MovieDetail } from '@Interfaces/movies/detail-movie.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type MovieDetailPageProps = {
  movieDetail: MovieDetail;
};

const MovieDetailPage: React.FC<MovieDetailPageProps> = () => {
  const router = useRouter();
  const { id: movieId } = router.query as Record<string, string>;

  const { data, isLoading, error } = useMovie({ movieId });

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

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<MovieDetail>(
    ['movieDetail', { id: ctx.params.id }],
    fetchMovieDetail
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MovieDetailPage;
