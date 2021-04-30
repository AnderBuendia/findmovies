import { SimpleGrid } from '@chakra-ui/react';

import { GetStaticProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchPopularMovies } from '@Lib/service';

import MainLayout from '@Components/layouts/MainLayout';
import Spinner from '@Components/generic/Spinner';
import PopularMoviesList from '@Components/PopularMoviesList';

import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type HomeProps = {
  popularMovies: PopularMovies[];
};

const HomePage: React.FC<HomeProps> = () => {
  const { data, isLoading, error } = useQuery<PopularMovies[]>(
    'popularMovies',
    fetchPopularMovies,
    { staleTime: Infinity }
  );

  isLoading && <Spinner />;
  error && <div>Something went wrong...</div>;

  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <SimpleGrid columns={[1, 2, 3, 4, 4, 7]} gap={4} py={2} px={[16, 16]}>
        {data.map((movie) => (
          <PopularMoviesList movie={movie} />
        ))}
      </SimpleGrid>
    </MainLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<PopularMovies[]>(
    'popularMovies',
    fetchPopularMovies,
    { staleTime: Infinity }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
