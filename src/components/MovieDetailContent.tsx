import { Box, Text } from '@chakra-ui/react';
import { MovieDetail } from '@Interfaces/movies/detail.interface';

export type MovieDetailContentProps = {
  data: MovieDetail;
};

const MovieDetailContent: React.FC<MovieDetailContentProps> = ({ data }) => {
  return (
    <Box
      w="100%"
      h="50%"
      bgImage={`linear-gradient(to right, rgba(5.10%, 4.71%, 4.71%, 1.00) 150px, 
        rgba(5.10%, 4.71%, 4.71%, 0.84) 100%), url(${data.background_image})`}
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Box p={10}>
        <Text color="whiteAlpha.900">From Movie Detail</Text>
      </Box>
    </Box>
  );
};

export default MovieDetailContent;
