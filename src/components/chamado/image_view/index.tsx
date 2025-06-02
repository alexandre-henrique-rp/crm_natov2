import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
} from "@chakra-ui/react";

interface ImageViewComponentProps {
  imageUrl: string;
}

export default function ImageViewComponent({
  imageUrl,
}: ImageViewComponentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Imagem miniatura clicável */}
      <Box
        cursor="pointer"
        onClick={onOpen}
        w={{ base: "100px", lg: "150px" }}
        h={{ base: "70px", lg: "80px" }}
      >
        <Image
          src={imageUrl}
          alt="Preview"
          borderRadius="md"
          objectFit="cover"
          objectPosition="center"
          w={{ base: "100px", lg: "150px" }}
          h={{ base: "70px", lg: "80px" }}
        />
      </Box>

      {/* Modal em tela cheia */}
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.9)">
          <ModalCloseButton color="white" />
          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={0}
          >
            <Image
              src={imageUrl}
              alt="Visualização em tela cheia"
              maxH="100vh"
              maxW="100vw"
              objectFit="contain"
              p={4}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
