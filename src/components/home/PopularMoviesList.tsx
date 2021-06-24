import { Box, Text, Image } from '@chakra-ui/react';
import Link from 'next/link';
import CircularScore from '@Components/generic/CircularScore';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export type PopularMoviesListProps = {
  movie: DataMovies;
};

const PopularMoviesList: React.FC<PopularMoviesListProps> = ({ movie }) => {
  const { id, title, poster, vote_average, vote_count } = movie;

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
            <CircularScore vote_average={vote_average * 10} />

            <Box as="span" mt="2" color="gray.600" fontSize="sm">
              {vote_count} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PopularMoviesList;
