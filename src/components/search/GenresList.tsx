import { Flex, Skeleton, Button } from '@chakra-ui/react';
import Link from 'next/link';
import useGenres from '@Lib/hooks/useGenres';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const GenresList: React.FC = () => {
  const { data, isLoading, error } = useGenres();

  if (isLoading) {
    <Skeleton height="20px" />;
  }

  error && <div>Something went wrong...</div>;

  return (
    <Flex direction="row" justifyContent="center" my={2} flexWrap="wrap">
      {data &&
        data.map((genre) => (
          <Link
            href={{
              pathname: `${MainPaths.SEARCH_GENRES}`,
              query: { q: genre.id, name: genre.name },
            }}
            key={genre.id}
            passHref={true}
          >
            <Button
              my={1}
              px={3}
              mr={2}
              height="25px"
              border="1px solid gray"
              borderRadius="full"
              bgColor="gray.500"
              color="white"
              name={genre.name}
              _hover={{ cursor: 'pointer', opacity: 0.7, color: 'gray.800' }}
            >
              {genre.name}
            </Button>
          </Link>
        ))}
    </Flex>
  );
};

export default GenresList;
