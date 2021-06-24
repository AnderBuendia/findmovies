import { useState } from 'react';
import { Input, Button, Box } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Router from 'next/router';
import { MainPaths } from '@Enums/paths/main-paths.enum';

export interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const searchMovies = (e, value) => {
    e.preventDefault();

    if (value.trim() === '') return;

    Router.push({
      pathname: MainPaths.SEARCH,
      query: { q: value },
    });
  };

  return (
    <Box
      marginLeft={['20px', '150px', '200px', '270px', '300px']}
      width={['80%', '40%']}
      mb={5}
    >
      <form onSubmit={(e) => searchMovies(e, value)}>
        <Input
          borderColor="gray.700"
          borderRightRadius="0"
          value={value}
          onChange={handleChange}
          size="md"
        />
        <Button
          type="submit"
          borderLeftRadius="0"
          colorScheme="gray.700"
          bgColor="gray.700"
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
