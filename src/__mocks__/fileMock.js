import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '../utils/theme';

export default function MockTheme({ children }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  );
}
