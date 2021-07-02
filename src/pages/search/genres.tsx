import { Text, Box } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useSearchGenre, { fetchMoviesByGenre } from '@Lib/hooks/useSearchGenre';
import MainLayout from '@Components/layouts/MainLayout';
import MoviesList from '@Components/movies/MoviesList';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

const SearchGenresPage: React.FC = () => {
  const router = useRouter();
  const { q, name } = router.query as Record<string, string>;
  const { data, isError, error } = useSearchGenre({ q });

  if (isError) return <Box>{error?.message}</Box>;

  return (
    <MainLayout
      title="Search Genres"
      description="Search your favorite movies by genre"
      url={MainPaths.SEARCH_GENRES}
    >
      <MoviesList data={data}>
        <Text casing="capitalize" fontSize="xl" fontWeight="bold">
          Results by {name}
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
  await queryClient.prefetchQuery<DataMovies[]>(['moviesByGenre', { q }], () =>
    fetchMoviesByGenre(q)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchGenresPage;
