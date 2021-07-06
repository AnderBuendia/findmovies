import NextImage from 'next/image';
import { chakra } from '@chakra-ui/react';

const CardImage = chakra(NextImage, {
  baseStyle: {
    borderTopRadius: 'lg',
  },
  shouldForwardProp: (prop) => ['width', 'height', 'src', 'alt'].includes(prop),
});

export default CardImage;
