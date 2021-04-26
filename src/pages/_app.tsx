import { ChakraProvider, theme } from '@chakra-ui/react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
