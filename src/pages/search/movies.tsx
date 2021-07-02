import { Text } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useSearchMovies, { fetchSearchMovies } from '@Lib/hooks/useSearchMovies';
import MainLayout from '@Components/layouts/MainLayout';
import MoviesList from '@Components/movies/MoviesList';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

const SearchMoviesPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query as Record<string, string>;
  const { data } = useSearchMovies({ q });

  return (
    <MainLayout
      title="Search Movies"
      description="Search your favorite movies"
      url={MainPaths.SEARCH_MOVIES}
    >
      <MoviesList data={data}>
        <Text casing="capitalize" fontSize="xl" fontWeight="bold">
          Results by {q}
        </Text>
      </MoviesList>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { q } = ctx.query as Record<string, string>;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataMovies[]>(['searchMovies', { q }], () =>
    fetchSearchMovies(q)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchMoviesPage;
