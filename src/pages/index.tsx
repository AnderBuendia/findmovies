import { SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useMovies, { fetchPopularMovies } from '@Lib/hooks/useMovies';
import MainLayout from '@Components/layouts/MainLayout';
import HomeLayout from '@Components/layouts/HomeLayout';
import ListSkeleton from '@Components/generic/ListSkeleton';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

const HomePage: React.FC = () => {
  const [popularDate, setPopularDate] = useState<string>('day');
  const { isLoading, isFetching, isError, error, data } = useMovies({
    popularDate,
  });

  const skeletonArray = [...new Array(10)];

  if (isLoading || isFetching) {
    return (
      <SimpleGrid
        py={20}
        px={10}
        columns={[1, 2]}
        spacing={5}
        data-testid="load-skeleton"
      >
        {skeletonArray.map((_, index) => (
          <ListSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (isError) {
    <div>{error?.message}</div>;
  }

  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <HomeLayout
        data={data}
        popularDate={popularDate}
        handlePopularDate={setPopularDate}
      />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataMovies[]>(
    ['popularMovies', { popularDate: 'day' }],
    () => fetchPopularMovies('day')
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
