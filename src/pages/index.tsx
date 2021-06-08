import { SimpleGrid } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { fetchPopularMovies } from '@Lib/service';

import MainLayout from '@Components/layouts/MainLayout';
import ListSkeleton from '@Components/generic/ListSkeleton';
import PopularMoviesList from '@Components/PopularMoviesList';

import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type HomePageProps = {
  popularMovies: PopularMovies[];
};

const HomePage: React.FC<HomePageProps> = () => {
  const { data, isLoading, error } = useQuery<PopularMovies[]>(
    'popularMovies',
    { staleTime: Infinity }
  );

  isLoading && <ListSkeleton />;
  error && <div>Something went wrong...</div>;

  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4} py={2} px={20}>
        {data.map((movie) => (
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
