import { Flex, Box, SimpleGrid, Heading } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useMovies, { fetchPopularMovies } from '@Lib/hooks/useMovies';

import MainLayout from '@Components/layouts/MainLayout';
import ListSkeleton from '@Components/generic/ListSkeleton';
import PopularMoviesList from '@Components/PopularMoviesList';

import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type HomePageProps = {
  popularMovies: PopularMovies[];
};

const HomePage: React.FC<HomePageProps> = () => {
  const { data, isLoading, error } = useMovies();

  isLoading && <ListSkeleton />;
  error && <div>Something went wrong...</div>;

  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <Flex direction="row" alignItems="center">
        <Heading as="h2" px={20}>
          Trending
        </Heading>
        <Flex
          borderWidth="1px"
          alignItems="center"
          direction="row"
          rounded="full"
          fontWeight="bold"
        >
          <Box
            bgGradient="linear(to-r, green.100, green.200)"
            py={1}
            px={6}
            rounded="full"
            color="blue.800"
          >
            Today
          </Box>
          <Box px={4}>This Week</Box>
        </Flex>
      </Flex>

      <SimpleGrid columns={[1, 2, 4, 5]} gap={4} py={3} px={20}>
        {data &&
          data.map((movie) => (
            <PopularMoviesList key={movie.id} movie={movie} />
          ))}
      </SimpleGrid>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PopularMovies[]>(
    'popularMovies',
    fetchPopularMovies
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
