import { Heading } from '@chakra-ui/react';
import { fetchPopularMovies } from 'utils/service';
import MainLayout from 'components/layouts/MainLayout';
import { MainPaths } from 'enums/paths/main-paths.enum';

const Home = ({ popularMovies }) => {
  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <Heading
        fontSize="10vw"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Title
      </Heading>
    </MainLayout>
  );
};

export async function getStaticProps() {
  const popularMovies = await fetchPopularMovies();

  return {
    props: {
      popularMovies,
    },
  };
}

export default Home;
