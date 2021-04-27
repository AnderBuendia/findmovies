import { Flex } from '@chakra-ui/react';
import Head from '../generic/Head';
import Header from '../Header';
import { HeadProps } from '../../interfaces/props/head-props.interface';

const MainLayout: React.FC<HeadProps> = ({
  title,
  description,
  url,
  children,
}) => {
  return (
    <>
      <Head title={title} description={description} url={url} />

      <div>
        <Header />
        <Flex justify="center" alignItems="center" height="25vh">
          {children}
        </Flex>
      </div>
    </>
  );
};

export default MainLayout;
