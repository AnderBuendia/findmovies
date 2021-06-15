import { Box, Image } from '@chakra-ui/react';
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
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        _hover={{ opacity: 0.7, cursor: 'pointer' }}
      >
        <Image src={poster} alt={title} />

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
