import {
  Box,
  Flex,
  Text,
  Image,
  Center,
  Container,
  UnorderedList,
  ListItem,
  Wrap,
  WrapItem,
  Divider,
  useDisclosure,
} from '@chakra-ui/react';
import CircularScore from '@Components/generic/CircularScore';
import ModalTrailer from '@Components/movie/ModalTrailer';
import PlayIcon from '@Components/icons/play-icon';
import { formatNumbers } from '@Lib/utils/formatCharacters';
import { MovieDetail } from '@Interfaces/movies/detail-movie.interface';
import ImageNotFoundIcon from '@Components/icons/image-not-found';

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
    vote_average,
    overview,
    cast,
    director,
    language,
    budget,
    revenue,
    status,
  } = data;
  const movie_date = new Date(release_date);

  return (
    <>
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

            <Flex
              direction="column"
              ml={[0, 10]}
              width={[300, 340, 450, 600, 800]}
            >
              <Flex
                direction={['row']}
                alignItems={['flex-start', 'center']}
                justifyContent="flex-start"
                fontSize="3xl"
              >
                <Text fontWeight="bold" mr={2}>
                  {title} <span>({movie_date.getFullYear()})</span>
                </Text>
              </Flex>

              <Flex direction="row" fontSize="md" mb={1}>
                <Text mr={3}>{movie_date.toLocaleDateString()}</Text>
                <UnorderedList>
                  <ListItem>
                    <Text>{`${Math.floor(runtime / 60)}h ${
                      runtime % 60
                    }min`}</Text>
                  </ListItem>
                </UnorderedList>
              </Flex>

              <Flex direction={['row']}>
                <Wrap>
                  {genres.map((genre) => (
                    <WrapItem
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
                    </WrapItem>
                  ))}
                </Wrap>
              </Flex>

              <Flex direction="row" alignItems="center" mt={3} mb={2}>
                <CircularScore vote_average={vote_average * 10} />
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
              <Text fontSize="sm">{overview}</Text>
              <Text fontWeight="bold" mt={3}>
                Director
              </Text>
              <Text fontSize="sm">{director}</Text>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Text ml={6} py={3} fontSize="xl" fontWeight="bold">
        Movie Cast
      </Text>

      <Flex
        py={3}
        overflow="auto"
        direction="row"
        css={{
          '&::-webkit-scrollbar': {
            height: '10px',
          },
          '&::-webkit-scrollbar-track': {
            height: '20px',
            marginLeft: '20px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#dbdbdb',
            borderRadius: '25px',
          },
        }}
      >
        {cast.map((person) => (
          <Box
            key={person.name}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            minW={140}
            w={140}
            ml={6}
          >
            {person.img ? (
              <Image
                objectFit="cover"
                src={person.img}
                alt={person.name}
                borderTopRadius="lg"
              />
            ) : (
              <ImageNotFoundIcon ml={18} width="100px" height="175px" />
            )}

            <Box textAlign="left" py={4} px={2}>
              <Text fontSize="sm" fontWeight="bold">
                {person.name}
              </Text>
              <Text fontSize="xs">{person.character}</Text>
            </Box>
          </Box>
        ))}
      </Flex>

      <Divider
        orientation="horizontal"
        mx={20}
        my={5}
        w="75%"
        textAlign="center"
      />

      <Flex direction={['column', 'row']} w="100%" pb={6} px={6}>
        <Flex direction="column" w={['100%', '25%']} mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            Budget
          </Text>
          <Text>{budget ? `$${formatNumbers(budget)}` : '-'}</Text>
        </Flex>
        <Flex direction="column" w={['100%', '25%']} mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            Revenue
          </Text>
          <Text>{revenue ? `$${formatNumbers(revenue)}` : '-'}</Text>
        </Flex>
        <Flex direction="column" w={['100%', '25%']} mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            Status
          </Text>
          <Text>{status}</Text>
        </Flex>
        <Flex direction="column" w={['100%', '25%']} mb={2}>
          <Text fontSize="lg" fontWeight="bold">
            Original Language
          </Text>
          <Text>{language}</Text>
        </Flex>
      </Flex>

      <ModalTrailer
        isOpen={isOpen}
        onClose={onClose}
        trailer={trailer}
        title={title}
      />
    </>
  );
};

export default MovieDetailContent;
