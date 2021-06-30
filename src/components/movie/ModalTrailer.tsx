import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  AspectRatio,
  Box,
} from '@chakra-ui/react';

export interface ModalTrailerProps {
  isOpen: boolean;
  onClose: () => void;
  trailer: string;
  title: string;
}

const ModalTrailer: React.FC<ModalTrailerProps> = ({
  isOpen,
  onClose,
  trailer,
  title,
}) => {
  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.800">
          <ModalHeader color="white" p={2} ml={2}>
            Watch Trailer
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={0}>
            <AspectRatio ratio={1.5}>
              <Box as="iframe" src={trailer} title={title} allowFullScreen />
            </AspectRatio>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalTrailer;
