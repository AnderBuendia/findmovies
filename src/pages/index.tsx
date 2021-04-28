import { Heading } from '@chakra-ui/react';
import MainLayout from 'components/layouts/MainLayout';
import { MainPaths } from 'enums/paths/main-paths.enum';

const Home = () => {
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

export default Home;
