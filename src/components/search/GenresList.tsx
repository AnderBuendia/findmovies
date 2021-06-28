import { Flex, Text, Skeleton } from '@chakra-ui/react';
import Link from 'next/link';
import useMovies from '@Lib/hooks/useMovies';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const GenresList: React.FC = () => {
  const { findGenres } = useMovies({});
  const { data, isLoading, error } = findGenres;

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
          >
            <a>
              <Text
                my={1}
                px={2}
                mr={2}
                border="1px solid gray"
                borderRadius="full"
                bgColor="gray.500"
                color="white"
                _hover={{ cursor: 'pointer', opacity: 0.7, color: 'gray.800' }}
              >
                {genre.name}
              </Text>
            </a>
          </Link>
        ))}
    </Flex>
  );
};

export default GenresList;
