import { Flex, Box, SimpleGrid, Heading, Container } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';
import MainLayout from '@Components/layouts/MainLayout';
import DataMoviesList from '@Components/home/DataMoviesList';
import SearchBar from '@Components/generic/SearchBar';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export interface HomeProps {
  data: DataMovies[];
  popularThisWeek: boolean;
  handlePopularThisWeek: Dispatch<SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({
  data,
  popularThisWeek,
  handlePopularThisWeek,
}) => {
  return (
    <MainLayout
      title="Home"
      description="Find your favourite movies"
      url={MainPaths.INDEX}
    >
      <Container maxW="container.xl" py={6}>
        <SearchBar />
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
              onClick={() => handlePopularThisWeek(false)}
            >
              Today
            </Box>
            <Box
              px={5}
              py={1}
              layerStyle={popularThisWeek && 'selected'}
              _hover={{ cursor: 'pointer' }}
              onClick={() => handlePopularThisWeek(true)}
            >
              This Week
            </Box>
          </Flex>
        </Flex>

        <SimpleGrid columns={[1, 2, 4, 5]} gap={4} mt={3}>
          {data &&
            data.map((movie) => (
              <DataMoviesList key={movie.id} movie={movie} />
            ))}
        </SimpleGrid>
      </Container>
    </MainLayout>
  );
};

export default Home;
