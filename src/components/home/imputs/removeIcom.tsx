import { Box, Icon, IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";

interface DeletarIconComponentProps extends IconButtonProps {
  Block?: boolean;
}

export const DeletarIconComponent = ({
  Block,
  ...props
}: DeletarIconComponentProps) => {
  return (
    <>
      {Block ? (
        <Tooltip label="Deletar solicitação">
          <IconButton
            colorScheme="red"
            variant="outline"
            size={"sm"}
            icon={<BsFillTrashFill />}
            {...props}
          />
        </Tooltip>
      ) : (
        <Box as="span">
          <Icon
            as={BsFillTrashFill}
            color={"red.200"}
            fontSize={"1.2rem"}
            cursor="not-allowed"
            mt={1.5}
            mx={'0.4rem'}
          />
        </Box>
      )}
    </>
  );
};