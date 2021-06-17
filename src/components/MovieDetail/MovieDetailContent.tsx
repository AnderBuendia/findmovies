import {
  Box,
  Flex,
  Text,
  Image,
  Center,
  Container,
  UnorderedList,
  ListItem,
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
    tagline,
    rating,
    overview,
    cast,
    director,
  } = data;
  const movie_date = new Date(release_date);

  return (
    <Box
      bgImage={`linear-gradient(to right, rgba(5.10%, 4.50%, 4.20%, 0.85) 150px, 
        rgba(5.10%, 4.71%, 4.71%, 0.84) 100%), url(${background_image})`}
      bgRepeat="no-repeat"
      bgSize="cover"
      py={6}
      color="white"
    >
      <Container maxW="container.xl">
        <Flex direction={['column', 'row']} alignItems="center">
          <Box
            _hover={{ opacity: 0.7, cursor: 'pointer' }}
            position="relative"
            onClick={onOpen}
          >
            <Image borderRadius="lg" src={poster_image} alt={title} />

            <Center
              position="absolute"
              inset="0"
              opacity="0"
              _hover={{ opacity: 1 }}
            >
              <Text
                bgColor="black"
                px={3}
                rounded="full"
                fontSize="2xl"
                top="2px"
                boxShadow="dark-lg"
              >
                Play Trailer
                <span>
                  <PlayIcon ml={2} />
                </span>
              </Text>
            </Center>
          </Box>

          <Flex direction="column" ml={[0, 5]}>
            <Flex
              direction={['row']}
              alignItems={['flex-start', 'center']}
              justifyContent="flex-start"
              fontSize="3xl"
            >
              <Text fontWeight="bold" mr={2}>
                {title}
              </Text>
              <Text fontWeight="thin">({movie_date.getFullYear()})</Text>
            </Flex>

            <Flex direction="row" fontSize="md" mb={1}>
              <Text mr={3}>{movie_date.toLocaleDateString()}</Text>
              <UnorderedList>
                <ListItem styleType="square">
                  <Text>{`${Math.floor(runtime / 60)}h ${
                    runtime % 60
                  }min`}</Text>
                </ListItem>
              </UnorderedList>
            </Flex>

            <Flex direction={['row']}>
              {genres.map((genre) => (
                <Text
                  key={genre.id}
                  px={2}
                  mr={2}
                  mb={2}
                  rounded="full"
                  bgColor="blue.900"
                  boxShadow="lg"
                  width="max-content"
                  fontSize="sm"
                >
                  {genre.name}
                </Text>
              ))}
            </Flex>

            <Flex direction="row" alignItems="center" my={2}>
              <CircularScore rating={rating * 10} />
              <Text ml={2} w={12} fontWeight="bold" display="inline-block">
                User Score
              </Text>
            </Flex>

            <Text as="i" fontSize="xl" fontWeight="thin" color="gray.200">
              {tagline}
            </Text>

            <Text fontSize="xl" fontWeight="bold" mt={2}>
              Overview
            </Text>
            <Text fontSize="sm" width={[340, 350, 500, 700]}>
              {overview}
            </Text>
            <Text fontWeight="bold" mt={3}>
              Director
            </Text>
            <Text fontSize="sm">{director}</Text>
          </Flex>
        </Flex>
      </Container>

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
