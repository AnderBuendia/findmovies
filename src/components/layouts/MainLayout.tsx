import { Flex } from '@chakra-ui/react';
import Head from '@Components/generic/Head';
import Header from '@Components/menu';
import { HeadProps } from '@Interfaces/props/head-props.interface';

const MainLayout: React.FC<HeadProps> = ({
  title,
  description,
  url,
  children,
}) => {
  return (
    <>
      <Head title={title} description={description} url={url} />

      <Flex direction="column">
        <Header />
        <Flex direction="column">{children}</Flex>
      </Flex>
    </>
  );
};

export default MainLayout;
