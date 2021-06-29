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

export type HomePageProps = {
  popularMovies: DataMovies[];
};

const HomePage: React.FC<HomePageProps> = () => {
  const [popularDate, setPopularDate] = useState<string>('day');
  const { findPopularMovies } = useMovies({ popularDate });
  const { data, isLoading, isFetching, error } = findPopularMovies;

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
    fetchPopularMovies
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
