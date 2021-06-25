import { Container, SimpleGrid, Text } from '@chakra-ui/react';
import DataMoviesList from '@Components/home/DataMoviesList';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export interface MoviesResultsListProps {
  data: DataMovies[];
  q: string;
}

const MoviesResultsList: React.FC<MoviesResultsListProps> = ({ data, q }) => {
  return (
    <Container maxW="container.xl" py={6}>
      <Text casing="capitalize" fontSize="xl" fontWeight="bold">
        Results by {q}
      </Text>
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4} mt={3}>
        {data &&
          data.map((movie) => <DataMoviesList key={movie.id} movie={movie} />)}
      </SimpleGrid>
    </Container>
  );
};

export default MoviesResultsList;
