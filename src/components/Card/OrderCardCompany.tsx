import { VStack, Text, HStack, Button, useDisclosure } from "@chakra-ui/react";
import { IOrderBody } from "../../providers/Order";
import { ModalCheckoutOrder } from "../Modal/ModalCheckoutOrder";

interface ItemProps {
  item: IOrderBody;
}

export const OrderCardCompany = ({ item }: ItemProps) => {
  const { id, title, description, status, address, vehicle } = item;
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();

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
      return "Enviado para reboque";
    }
  };

  return (
    <VStack
      h={["220px"]}
      w={["200px", "250px", "270px", "300px"]}
      alignItems="flex-start"
      p="20px 0px 0px 20px"
      border="2px solid"
      borderRadius="5px"
      color="text"
      borderColor="text"
    >
      <Text as="h1" fontSize={["md", "2xl"]} color="text" fontWeight="bold">
        {title}
      </Text>
      <Text as="h6" color="text" fontSize="xs">
        {description}
      </Text>
      <Text fontSize="xs">{address}</Text>
      <Text fontSize="xs">
        {vehicle?.model} - {vehicle?.year}
      </Text>
      <HStack
        h="45px"
        w="90%"
        alignItems="flex-end"
        justifyContent="space-between"
      >
        <Text fontSize="sm">{updateProgress()}</Text>
        <Button
          w="90px"
          h="30px"
          color="text"
          bgColor="baseDefault"
          borderColor="text"
          border="1px solid"
          _hover={{ bgColor: "primary" }}
          type="submit"
          onClick={onToggle}
          disabled={status === "concluded" || status === "sent_to_rescue"}
        >
          Atualizar
        </Button>
      </HStack>
      <ModalCheckoutOrder
        orderId={id as any}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </VStack>
  );
};
