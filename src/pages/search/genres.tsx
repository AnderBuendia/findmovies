import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import useSearchGenre from '@Lib/hooks/useSearchGenre';
import MainLayout from '@Components/layouts/MainLayout';
import MoviesResultsList from '@Components/search/MoviesResultsList';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';
import { fetchMoviesByGenre } from '@Lib/hooks/useSearchGenre';

const SearchGenresPage: React.FC = () => {
  const router = useRouter();
  const { q } = router.query as Record<string, string>;
  const { data, isLoading } = useSearchGenre({ q });

  console.log('DATAGENRES', data);

  return (
    <MainLayout
      title="Search Genres"
      description="Search your favorite movies by genre"
      url={MainPaths.SEARCH_GENRES}
    >
      <MoviesResultsList data={data} q={q} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<DataMovies[]>(
    ['moviesByGenre', { q: ctx.query.q }],
    fetchMoviesByGenre
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchGenresPage;
