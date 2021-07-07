import { Box, Text, Center } from '@chakra-ui/react';
import Link from 'next/link';
import CircularScore from '@Components/generic/CircularScore';
import { DataMovies } from '@Interfaces/movies/data-movies.interface';
import { MainPaths } from '@Enums/paths/main-paths.enum';
import ImageNotFoundIcon from '@Components/icons/image-not-found';
import CardImage from '@Components/generic/CardImage';

export type DataMoviesListProps = {
  movie: DataMovies;
};

const DataMoviesList: React.FC<DataMoviesListProps> = ({ movie }) => {
  const { id, title, poster, vote_average, vote_count } = movie;

  return (
    <Link href={`${MainPaths.MOVIE}/${id}`}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="md"
        _hover={{ opacity: 0.7, cursor: 'pointer' }}
      >
        <Center borderTopRadius="lg" bgColor="gray.100">
          {poster ? (
            <CardImage src={poster} alt={title} width={384} height={480} />
          ) : (
            <ImageNotFoundIcon width="180px" height="272px" />
          )}
        </Center>

        <Box p={6} borderTop="gray 1px solid">
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

export default DataMoviesList;
