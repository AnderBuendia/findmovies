import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export type CircularScoreProps = {
  vote_average: number;
};

const CircularScore: React.FC<CircularScoreProps> = ({ vote_average }) => {
  let barColor = 'blue.400';

  switch (true) {
    case vote_average >= 80:
      barColor = 'green.400';
      break;
    case vote_average >= 50 && vote_average <= 79:
      barColor = 'yellow.400';
      break;
    case vote_average <= 49:
      barColor = 'red.400';
      break;
    default:
      barColor;
  }

  return (
    <CircularProgress
      p={0.5}
      boxShadow="lg"
      trackColor="gray.600"
      color={barColor}
      bgColor="blue.800"
      rounded="full"
      value={vote_average}
      size="60px"
    >
      <CircularProgressLabel fontWeight="bold" fontSize="md" color="white">
        {vote_average}%
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default CircularScore;
