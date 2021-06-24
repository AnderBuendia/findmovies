import { Box, Heading } from '@chakra-ui/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useSearchMovies, { fetchSearchMovies } from '@Lib/hooks/useSearchMovies';
import MainLayout from '@Components/layouts/MainLayout';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
  const router = useRouter();
  const { q } = router.query as Record<string, string>;
  const { data, isLoading, isFetching, error } = useSearchMovies({ q });

  console.log('DATA', data);
  return (
    <MainLayout
      title="Search"
      description="Search your favorite movies"
      url={MainPaths.SEARCH}
    >
      <Box>
        <Heading>From Search Pâge</Heading>
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  console.log('CTX', ctx.query.q);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataMovies[]>(
    ['searchMovies', { q: ctx.query.q }],
    fetchSearchMovies
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchPage;
