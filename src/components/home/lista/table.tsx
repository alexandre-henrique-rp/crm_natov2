import {
  Box,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { FaRunning } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { AlertIcomCompoment } from "../imputs/alertIcom";
import { AndamentoIconComponent } from "../imputs/andamentoIcon";

export const TableComponent = () => {
  return (
    <>
      <Tr>
        <Td>
          <Flex gap={2}>
            <AlertIcomCompoment />
            <AndamentoIconComponent andamento={false} />
            <NowIconComponent now={false} />
            <EditarIconComponent aria-label="Editar solicitação" />

            <DeletarIconComponent
              aria-label="Deletar solicitação"
              _hover={{ bg: "red.300", color: "white", border: "none" }}
            />
            <DistratoIconComponent
              aria-label="Distrato solicitação"
              distrato={false}
            />
          </Flex>
        </Td>
      </Tr>
    </>
  );
};

//TODO: finalizar componente

const NowIconComponent = ({ now }: { now: boolean }) => {
  const rgbBlink = keyframes`
    0% { color: green; }
    10% { color: yellowgreen; }
    20% { color: orange; }
    30% { color: red; }
    40% { color: blue; }
    50% { color: white; }
    60% { color: green; }
    70% { color: yellowgreen; }
    80% { color: orange; }
    90% { color: red; }
    100% { color: blue; }
  `;
  return (
    <>
      {!now ? (
        <Box
          alignSelf={"center"}
          as="span"
          fontWeight="bold"
          sx={{
            transform: "rotate(-45deg)",
            textOrientation: "upright",
            animation: `${rgbBlink} 1s infinite`,
          }}
        >
          N O W
        </Box>
      ) : (
        <Box
          alignSelf={"center"}
          as="span"
          fontWeight="bold"
          sx={{
            transform: "rotate(-45deg)",
            textOrientation: "upright",
            color: "gray.300",
            cursor: "not-allowed",
            fontSize: "0.7rem",
          }}
        >
          N O W
        </Box>
      )}
    </>
  );
};

interface EditarIconComponentProps extends IconButtonProps {}

const EditarIconComponent = ({ ...props }: EditarIconComponentProps) => {
  return (
    <>
      <Tooltip label="Editar solicitação">
        <IconButton
          colorScheme="blue"
          size={"sm"}
          icon={<BsBoxArrowUpRight />}
          {...props}
        />
      </Tooltip>
    </>
  );
};

interface DeletarIconComponentProps extends IconButtonProps {
  Block?: boolean;
}

const DeletarIconComponent = ({
  Block,
  ...props
}: DeletarIconComponentProps) => {
  return (
    <>
      {!Block ? (
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
            color={"red.300"}
            fontSize={"1.5rem"}
            cursor="not-allowed"
            my={1}
          />
        </Box>
      )}
    </>
  );
};

interface DistratoIconComponentProps extends IconButtonProps {
  distrato?: boolean;
}

const DistratoIconComponent = ({ distrato, ...props }: DistratoIconComponentProps) => {
  return (
    <>
      {!distrato ? (
        <Tooltip label="Distrato">
          <Box as="span">
          <IconButton
            colorScheme="red"
            variant="outline"
            size={"sm"}
            icon={<MdOutlineInsertPageBreak />}
            {...props}
          />
          </Box>
        </Tooltip>
      ) : (
        <Box as="span">
          <Icon
            as={MdOutlineInsertPageBreak}
            color={"gray.300"}
            fontSize={"1.5rem"}
            fontWeight={"900"}
            cursor="not-allowed"
            my={1}
          />
        </Box>
      )}
    </>
  );
};