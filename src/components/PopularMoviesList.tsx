import {
  Box,
  Text,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Center,
  Image,
} from '@chakra-ui/react';
import { PopularMovies } from '@Interfaces/movies/popular.interface';

export type PopularMoviesListProps = {
  movie: PopularMovies;
};

const PopularMoviesList: React.FC<PopularMoviesListProps> = ({ movie }) => {
  return (
    <Box
      key={movie.id}
      justify="center"
      align="center"
      shadow="2xl"
      border="1px"
      borderColor="gray.600"
      borderRadius="lg"
    >
      <Image
        borderTopLeftRadius="md"
        borderTopRightRadius="md"
        boxSize="260"
        src={movie.poster}
        alt={movie.title}
        shadow="md"
        borderBottom="1px"
        borderColor="gray.600"
      />

      <Center h="150px" bgColor="blackAlpha.100" p={2}>
        <Flex direction="column">
          <Text
            position="relative"
            fontSize="lg"
            fontWeight="bold"
            align="center"
            my={1}
          >
            {movie.title}
          </Text>

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
        </Flex>
      </Center>
    </Box>
  );
};

export default PopularMoviesList;
