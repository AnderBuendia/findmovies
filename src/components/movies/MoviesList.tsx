import { SimpleGrid, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import MovieCard from '@Components/movies/MovieCard';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';

export type MoviesListProps = {
  data: DataMovies[];
  children: ReactNode;
};

const MoviesList: React.FC<MoviesListProps> = ({ data, children }) => {
  return (
    <Container maxW="container.xl" py={6} px={24}>
      {children}
      <SimpleGrid columns={[1, 2, 4, 5]} gap={4} mt={3} px={6}>
        {data &&
          data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </SimpleGrid>
    </Container>
  );
};

export default MoviesList;
