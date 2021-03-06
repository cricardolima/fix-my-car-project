import * as React from "react";
import {
  Flex,
  Text,
  Box,
  Img,
  Stack,
  Button,
  Link as ChakraLink,
} from "@chakra-ui/react";
import registerSvg from "../../assets/registerUser.svg";
import { ButtonBack } from "../../components/ButtonBack";
import { Input } from "../../components/Input";
import consertaLogo from "../../assets/logo.png";

import { Link } from "react-router-dom";

import { useUserAuth } from "../../providers/UserAuth";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { FaEnvelope, FaLock } from "react-icons/fa";

interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  passwordTwo?: string;
  type: string;
  cpf: string;
}
const registerUserSchema = yup.object().shape({
  name: yup.string().required("Nome Obrigátorio"),
  email: yup.string().required("Email Obrigatório").email("Email inválido"),
  password: yup
    .string()
    .required("Senha Obrigatório")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g,
      "8 caracters:1 letra maiúscula,1 letra minúscula, 1 número e 1 caractere especial."
    ),
  passwordTwo: yup
    .string()
    .required("Confirmar Senha Obrigatório")
    .oneOf([yup.ref("password"), null], "As senhas não correspondem!"),
  cpf: yup
    .string()
    .required("Campo obrigatório!")
    .matches(
      /([0-9]{3}[0-9]{3}[0-9]{3}[0-9]{2})/gi,
      "Somente números Exemplo : 12345678900"
    ),
});

export const RegisterUser = () => {
  const { registerUser } = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerUserSchema) });
  const handleRegisterUser = (data: RegisterUserData) => {
    const newData = {
      ...data,
      type: "user",
    };
    registerUser(newData);
  };
  return (
    <Flex
      width="100%"
      padding="10px 0px"
      height={["", "100vh", "100vh"]}
      flexDirection={["column", "column", "row"]}
      justifyContent="center"
      alignItems="center"
      bgGradient={[
        "linear(to-b, secondary 100%,baseDefault 0%)",
        "linear(to-t, secondary 50%,baseDefault 50%)",
        "linear(to-r, baseDefault 50%, secondary 50%)",
      ]}
    >
      <Flex
        display={["none", "flex", "flex"]}
        flex="1"
        justifyContent={["flex-start", "center", "center"]}
        alignItems="center"
        flexDirection="column"
        paddingBottom="35px"
      >
        <Flex width="90%" justifyContent="flex-start" alignItems="flex-start">
          <ButtonBack />
        </Flex>
        <Box>
          <Img src={registerSvg} alt="Registro de Usuário" />
        </Box>
        <Text fontSize="4xl" fontWeight="bold">
          Permita-nos ajudá-lo
        </Text>
        <Text fontSize="xl" textAlign="center">
          o Conserta Meu Carro quer melhorar seu contato com quem pode lhe
          ajudar
        </Text>
      </Flex>
      <Flex
        flex="1"
        justifyContent="center"
        flexDirection="column"
        gridGap="10px"
        alignItems="center"
      >
        <Flex
          display={["flex", "none", "none", "none"]}
          width="90%"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <ButtonBack />
        </Flex>
        <Stack
          as="form"
          onSubmit={handleSubmit(handleRegisterUser)}
          width="95%"
          maxWidth="500px"
          bgColor="baseDefault"
          spacing={4}
          boxSizing="border-box"
          padding={["10px 20px", "15px 20px", "15px 20px"]}
          boxShadow="0px 4px 8px 4px rgba(0, 0, 0, 0.25);"
        >
          <Flex
            width="100%"
            flexDirection={["column", "row", "row"]}
            margin="0 auto"
          >
            <Flex
              flex="2"
              justifyContent="center"
              alignItems="center"
              gridGap="5px"
            >
              <Img width="100px" src={consertaLogo} alt="Conserta meu carro!" />
              <Text fontSize={["lg", "2xl", "2xl"]} fontWeight="bold">
                Cadastro de Usuário
              </Text>
            </Flex>
          </Flex>
          <Box w="100%">
            <Input
              placeholder="Nome Completo"
              label={"Nome Completo :"}
              type="text"
              error={errors.name}
              {...register("name")}
            />
          </Box>

          <Box w="100%">
            <Input
              placeholder="Email"
              label={"Email :"}
              type="email"
              error={errors.email}
              {...register("email")}
              icon={FaEnvelope}
            />
            {!errors.email && (
              <Text ml="1" color="secondary">
                Exemplo : nome@email.com
              </Text>
            )}
          </Box>

          <Box w="100%">
            <Input
              placeholder="CPF"
              label={"CPF :"}
              type="number"
              error={errors.cpf}
              {...register("cpf")}
            />
            {!errors.cpf && (
              <Text ml="1" color="secondary">
                Exemplo: 12345678900
              </Text>
            )}
          </Box>

          <Box w="100%">
            <Input
              placeholder="Senha"
              label={"Senha :"}
              type="password"
              error={errors.password}
              {...register("password")}
              icon={FaLock}
            />
            {!errors.password && (
              <Text ml="1" color="secondary">
                A senha deve ter...
              </Text>
            )}
          </Box>

          <Box w="100%">
            <Input
              placeholder="Confirmação de Senha"
              label={"Confirmação de Senha :"}
              type="password"
              error={errors.passwordTwo}
              {...register("passwordTwo")}
              icon={FaLock}
            />
          </Box>
          <Button
            width="100%"
            padding="30px"
            color="baseDefault"
            bgColor="blue.600"
            _hover={{ bgColor: "blue.500" }}
            type="submit"
          >
            Cadastrar
          </Button>
          <Text textAlign="center">
            É empresa?{" "}
            <ChakraLink as={Link} color="secondary" to="/registerCompany">
              clique aqui
            </ChakraLink>{" "}
            para se cadastrar!
          </Text>
        </Stack>
      </Flex>
    </Flex>
  );
};
