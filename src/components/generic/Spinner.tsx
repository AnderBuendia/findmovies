import { Spinner as ChakraSpinner } from '@chakra-ui/react';

const Spinner: React.FC = () => (
  <ChakraSpinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
);

export default Spinner;
