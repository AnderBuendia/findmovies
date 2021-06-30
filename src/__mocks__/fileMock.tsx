import { ChakraProvider } from '@chakra-ui/react';
import customTheme from '@Lib/utils/theme';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

export const Wrapper = ({ children }) => (
  <ChakraProvider resetCSS theme={customTheme}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </ChakraProvider>
);
