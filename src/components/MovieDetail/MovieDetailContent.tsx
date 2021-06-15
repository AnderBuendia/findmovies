import {
  Box,
  Flex,
  Text,
  Image,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import CircularScore from '@Components/generic/CircularScore';
import ModalTrailer from '@Components/MovieDetail/ModalTrailer';
import PlayIcon from '@Components/icons/play-icon';
import { MovieDetail } from '@Interfaces/movies/detail.interface';

export type MovieDetailContentProps = {
  data: MovieDetail;
};

const MovieDetailContent: React.FC<MovieDetailContentProps> = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    title,
    background_image,
    poster_image,
    release_date,
    trailer,
    genres,
    runtime,
    rating,
  } = data;
  const movie_date = new Date(release_date);

  return (
    <Box
      w="full"
      h="50%"
      bgImage={`linear-gradient(to right, rgba(5.10%, 4.50%, 4.20%, 0.85) 150px, 
        rgba(5.10%, 4.71%, 4.71%, 0.84) 100%), url(${background_image})`}
      bgPos="center"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Flex
        direction="row"
        justifyContent="flex-start"
        px={[2, 6, 16, 32]}
        py={6}
      >
        <Box
          _hover={{ opacity: 0.7, cursor: 'pointer' }}
          position="relative"
          onClick={onOpen}
        >
          <Image
            borderRadius="lg"
            objectFit="cover"
            src={poster_image}
            alt={title}
            display="block"
          />
          <Center
            position="absolute"
            inset="0"
            h="100%"
            w="100%"
            opacity="0"
            _hover={{ opacity: 1 }}
          >
            <Text
              bgColor="black"
              px={3}
              rounded="full"
              color="white"
              fontSize="2xl"
              top="2px"
              boxShadow="dark-lg"
            >
              Play Trailer
              <span>
                <PlayIcon ml={2} color="white" />
              </span>
            </Text>
          </Center>
        </Box>
        <Flex direction="column" ml={5}>
          <Text fontSize="3xl" fontWeight="bold" color="white">
            {title}
            <span style={{ fontWeight: 'lighter', marginLeft: '4px' }}>
              ({movie_date.getFullYear()})
            </span>
          </Text>

          <Flex direction="row">
            {genres.map((genre) => (
              <Text
                py={0.2}
                px={2}
                mr={2}
                mb={2}
                rounded="full"
                bgColor="blue.900"
                color="white"
                boxShadow="lg"
              >
                {genre.name}
              </Text>
            ))}
          </Flex>

          <Flex direction="row" alignItems="center">
            <CircularScore rating={rating} />
            <Text color="white">{movie_date.toLocaleDateString()}</Text>
          </Flex>
        </Flex>
      </Flex>
      <ModalTrailer
        isOpen={isOpen}
        onClose={onClose}
        trailer={trailer}
        title={title}
      />
    </Box>
  );
};

export default MovieDetailContent;
