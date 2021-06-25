import { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Router from 'next/router';
import { MainPaths } from '@Enums/paths/main-paths.enum';

const SearchBar: React.FC = () => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const searchMovies = (e: React.FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault();

    if (value.trim() === '') return;

    Router.push({
      pathname: MainPaths.SEARCH_MOVIES,
      query: { q: value },
    });
  };

  return (
    <Box w={['89%', '40%']} ml={['0px', '160px', '190px', '260px']}>
      <form onSubmit={(e) => searchMovies(e, value)}>
        <Input
          borderColor="gray.500"
          borderRightRadius="0"
          value={value}
          onChange={handleChange}
          size="md"
        />
        <Button
          type="submit"
          borderLeftRadius="0"
          colorScheme="gray.500"
          bgColor="gray.500"
          variant="outline"
          position="absolute"
        >
          <SearchIcon color="white" w={5} h={5} />
        </Button>
      </form>
    </Box>
  );
};

export default SearchBar;
