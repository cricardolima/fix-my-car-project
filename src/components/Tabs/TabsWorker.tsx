import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Link,
  Button,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import ModalInstruction from "../../components/Modal/ModalInstruction";
import { useOrder } from "../../providers/Order";
import { OrderCardCompany } from "../Card/OrderCardCompany";
import { OrderCardUnpicked } from "../Card/OrderCardUnpicked";

export const TabsWorker = () => {
  const { onToggle, isOpen, onClose, onOpen } = useDisclosure();
  const { companyOrders, unpickedOrders } = useOrder();

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Meus Serviços</Tab>
        <Tab>Serviços Disponíveis</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex padding="10px" flexWrap="wrap">
            <Button onClick={onToggle}>Tutorial do Maps</Button>
          </Flex>
          <ModalInstruction isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
          <Flex
            width="100%"
            maxWidth="930px"
            justifyContent={["center", "center", "center", "flex-start"]}
            gridGap="10px"
            flexWrap="wrap"
            margin="0 auto"
          >
            {companyOrders.map((item, index) => (
              <OrderCardCompany item={item as any} key={index} />
            ))}
          </Flex>
        </TabPanel>
        <TabPanel>
          <Flex
            width="100%"
            maxWidth="930px"
            justifyContent={["center", "center", "center", "flex-start"]}
            gridGap="10px"
            flexWrap="wrap"
            margin="0 auto"
          >
            {unpickedOrders.map((item, index) => (
              <OrderCardUnpicked item={item as any} key={index} />
            ))}
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
