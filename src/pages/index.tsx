import { useState } from 'react';
import { Flex, Box, SimpleGrid, Heading, Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
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
  const [popularThisWeek, setPopularThisWeek] = useState(false);
  const { data, isLoading, isFetching, error } = useMovies({ popularThisWeek });
  const skeletonArray = [...new Array(10)];

  if (isFetching || isLoading) {
    skeletonArray.map((_, index) => <ListSkeleton key={index} />);
  }

  error && <div>Something went wrong...</div>;

  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <Container maxW="container.xl">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading as="h2">Trending</Heading>
          <Flex
            borderWidth="1px"
            alignItems="center"
            direction="row"
            rounded="full"
            fontWeight="bold"
          >
            <Box
              px={6}
              py={1}
              layerStyle={!popularThisWeek && 'selected'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => setPopularThisWeek(false)}
            >
              Today
            </Box>
            <Box
              px={5}
              py={1}
              layerStyle={popularThisWeek && 'selected'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => setPopularThisWeek(true)}
            >
              This Week
            </Box>
          </Flex>
        </Flex>

        <SimpleGrid columns={[1, 2, 4, 5]} gap={4} mt={3}>
          {data &&
            data.map((movie) => (
              <PopularMoviesList key={movie.id} movie={movie} />
            ))}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PopularMovies[]>(
    ['popularMovies', { popularThisWeek: false }],
    fetchPopularMovies
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
