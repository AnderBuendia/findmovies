import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useMovies, { fetchPopularMovies } from '@Lib/hooks/useMovies';
import Home from '@Components/home/Home';
import ListSkeleton from '@Components/generic/ListSkeleton';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export type HomePageProps = {
  popularMovies: DataMovies[];
};

const HomePage: React.FC<HomePageProps> = () => {
  const [popularThisWeek, setPopularThisWeek] = useState<boolean>(false);
  const { data, isLoading, isFetching, error } = useMovies({ popularThisWeek });
  const skeletonArray = [...new Array(10)];

  if (isFetching || isLoading) {
    skeletonArray.map((_, index) => <ListSkeleton key={index} />);
  }

  error && <div>Something went wrong...</div>;

  return (
    <Home
      data={data}
      popularThisWeek={popularThisWeek}
      handlePopularThisWeek={setPopularThisWeek}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataMovies[]>(
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
