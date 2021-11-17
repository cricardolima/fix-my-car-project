import {
  VStack,
  Text,
  HStack,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IOrderBody } from "../../providers/Order";
import { AiOutlineCheck } from "react-icons/ai";
import ModalEvaluationScreen from "../Modal/ModalEvaluationScreen";

interface ItemProps {
  item: IOrderBody;
}

type inputVariationOptions = {
  [key: string]: string;
};
const inputVariation: inputVariationOptions = {
  pending: "placeholder",
  default: "text",
  concluded: "success",
  in_progress: "primary",
};

export const OrderCard = ({ item }: ItemProps) => {
  const { title, description, status } = item;
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const [variation, setVariation] = useState("default");

  const updateProgress = () => {
    if (status === "pending") {
      return "Pendente";
    }
    if (status === "in_progress") {
      return "Em andamento";
    }
    if (status === "concluded") {
      return "Concluído";
    } else {
      return "A caminho";
    }
  };

  useEffect(() => {
    if (status === "pending") {
      return setVariation("pending");
    }
    if (status === "in_progress") {
      return setVariation("in_progress");
    }
    if (status === "concluded") {
      return setVariation("concluded");
    } else {
      return setVariation("default");
    }
  }, [status]);

  return (
    <VStack
      h={["220px"]}
      w={["200px", "250px", "270px", "300px"]}
      alignItems="flex-start"
      p="20px 0px 0px 10px"
      border="2px solid"
      borderRadius="5px"
      color={inputVariation[variation]}
      borderColor={inputVariation[variation]}
    >
      <Text as="h1" fontSize={["md","2xl"]} color="text" fontWeight="bold">
        {title}
      </Text>
      <Text as="h6" color="text">
        {description}
      </Text>
      <HStack
        h="80px"
        w="90%"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text fontSize="sm">{updateProgress()}</Text>
        <Button
          w="30px"
          h="30px"
          color={inputVariation[variation]}
          bgColor="baseDefault"
          borderColor={inputVariation[variation]}
          border="1px solid"
          _hover={{ bgColor: "primary" }}
          type="submit"
          onClick={onToggle}
        >
          <Icon as={AiOutlineCheck} />
        </Button>
      </HStack>
      <ModalEvaluationScreen
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </VStack>
  );
};