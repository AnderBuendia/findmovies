import {
  Box,
  Image,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import Link from 'next/link';
import { PopularMovies } from '@Interfaces/movies/popular.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type PopularMoviesListProps = {
  movie: PopularMovies;
};

const PopularMoviesList: React.FC<PopularMoviesListProps> = ({ movie }) => {
  return (
    <Link href={`${MainPaths.MOVIE}/${movie.id}`}>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        _hover={{ opacity: 0.7, cursor: 'pointer' }}
      >
        <Image src={movie.poster} alt={movie.title} />

        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            textAlign="center"
          >
            {movie.title}
          </Box>

          <Box
            d="flex"
            flexDirection="column"
            mt="2"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress
              trackColor="gray.600"
              color="green.400"
              value={movie.rating * 10}
              verticalAlign="none"
            >
              <CircularProgressLabel fontWeight="bold" fontSize="sm">
                {movie.rating * 10}%
              </CircularProgressLabel>
            </CircularProgress>

            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {movie.votes} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PopularMoviesList;
