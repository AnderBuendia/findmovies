import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import Head from '../generic/Head';
import Header from '../generic/Header';
import { HeadProps } from '../../interfaces/props/head-props.interface';
import { MainPaths } from '../../enums/paths/main-paths.enum';

const MainLayout: React.FC<HeadProps> = ({
  title,
  description,
  url,
  children,
}) => {
  const router = useRouter();

  return (
    <>
      <Head title={title} description={description} url={url} />

      <Flex justifyContent="center" alignItems="center" height="100vh">
        {router.pathname !== MainPaths.INDEX && <Header />}
        <div>{children}</div>
      </Flex>
    </>
  );
};

export default MainLayout;
