import { Center, Spinner } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { dehydrate } from 'react-query/hydration';
import { QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import useMovie, { fetchMovieDetail } from '@Lib/hooks/useMovie';
import MovieDetailContent from '@Components/movie/MovieDetailContent';
import MainLayout from '@Components/layouts/MainLayout';
import { MovieDetail } from '@Interfaces/movies/detail-movie.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const MovieDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query as Record<string, string>;

  const { data, isLoading, isError, error } = useMovie({ id });

  if (isLoading) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          data-testid="loading-spinner"
        />
      </Center>
    );
  }
  if (isError) return <Center>{error?.message}</Center>;

  if (data) {
    return (
      <MainLayout
        title={data.title}
        description={data.tagline}
        url={`${MainPaths.MOVIE}/${id}`}
      >
        <MovieDetailContent data={data} />
      </MainLayout>
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { id } = ctx.params as Record<string, string>;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<MovieDetail>(['movieDetail', { id }], () =>
    fetchMovieDetail(id)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default MovieDetailPage;
