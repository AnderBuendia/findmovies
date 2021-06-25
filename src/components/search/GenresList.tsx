import { Flex, Text, Skeleton } from '@chakra-ui/react';
import useMovies from '@Lib/hooks/useMovies';

const GenresList: React.FC = () => {
  const { findGenres } = useMovies({});
  const { data, isLoading, error } = findGenres;

  const handleSearchGenre = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    name: string
  ) => {
    // TODO: redirect to search/genres
  };

  if (isLoading) {
    <Skeleton height="20px" />;
  }

  return (
    <Flex direction="row" justifyContent="center" py={3}>
      {data &&
        data.map((genre) => (
          <Text
            key={genre.id}
            px={2}
            mr={2}
            border="1px solid gray"
            borderRadius="full"
            bgColor="gray.500"
            color="white"
            _hover={{ cursor: 'pointer', opacity: 0.7, color: 'gray.800' }}
            onClick={(e) => handleSearchGenre(e, genre.name)}
          >
            {genre.name}
          </Text>
        ))}
    </Flex>
  );
};

export default GenresList;
