import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";

import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Hide,
  Text,
} from "@chakra-ui/react";
import { AddContext } from "../context/AppContext";
const AddPost = (payload, token) => {
  return axios({
    method: "POST",
    url: "https://tan-uptight-oyster.cyclic.app/post",
    data: payload,
    headers: {
      Authorization: token,
    },
  });
};

const Navbar = () => {
  const { refresh, setrefresh } = React.useContext(AddContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem("token");
  const toast = useToast();
  const navigate = useNavigate();

  const [image, setImage] = React.useState("");
  const [like, setLike] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [isLiked, setIsliked] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      image,
      like,
      description,
      comment: "",
    };
    AddPost(payload, token)
      .then((res) => {
        toast({
          title: `${res.data.msg}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setrefresh(!refresh);
        onClose();
      })
      .catch((err) => {
        toast({
          title: `${err}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
    setImage("");
    setDescription("");
  };

  return (
    <Box className="nav">
      <Heading>
        <span className="white">SJ</span>
        <span className="black">_Digital</span>
      </Heading>
      {token && (
        <Box className="right-end">
          <Box>
            <Button
              onClick={onOpen}
              colorScheme="blue"
              bgColor="white"
              color="white"
              variant="outline"
            >
              <GrAdd />
              <Hide below="md">
                <Text color="blue.600" ml={5}>
                  Add
                </Text>
              </Hide>
            </Button>

            <Modal
              blockScrollOnMount={true}
              closeOnOverlayClick={true}
              isOpen={isOpen}
              onClose={onClose}
              size="xl"
            >
              <ModalOverlay />
              <ModalContent className="modal">
                <ModalHeader>Add New Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" gap={3}>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <FormControl isRequired>
                      <FormLabel>Enter Image Url</FormLabel>
                      <Input
                        placeholder="Enter Image url"
                        onChange={(e) => setImage(e.target.value)}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Enter Description</FormLabel>
                      <Input
                        placeholder="Description/Caption"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" variant="outline">
                      Post
                    </Button>
                  </form>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FaRegUserCircle className="icon" />}
              variant="solid"
            />
            <MenuList>
              <MenuItem
                background="red"
                color="white"
                icon={<IoExitOutline />}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
