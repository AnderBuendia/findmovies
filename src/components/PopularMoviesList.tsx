import { Box, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';
import CircularScore from '@Components/generic/CircularScore';
import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type PopularMoviesListProps = {
  movie: PopularMovies;
};

const PopularMoviesList: React.FC<PopularMoviesListProps> = ({ movie }) => {
  const { id, title, poster, rating, votes } = movie;

  return (
    <Link href={`${MainPaths.MOVIE}/${id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        _hover={{ opacity: 0.7, cursor: 'pointer' }}
      >
        <Image src={poster} alt={title} borderTopRadius="lg" />

        <Box p={6}>
          <Text fontWeight="bold" isTruncated textAlign="center">
            {title}
          </Text>

          <Box d="flex" flexDirection="column" alignItems="center">
            <CircularScore rating={rating * 10} />

            <Box as="span" mt="2" color="gray.600" fontSize="sm">
              {votes} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PopularMoviesList;
