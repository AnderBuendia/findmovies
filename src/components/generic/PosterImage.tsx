import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';

const PosterImage = chakra(NextImage, {
  baseStyle: {
    borderRadius: 'lg',
  },
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
});

export default PosterImage;
