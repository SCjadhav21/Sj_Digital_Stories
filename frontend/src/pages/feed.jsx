import React, { useState, useEffect } from "react";
import { Box, Text, Image, Divider, useToast } from "@chakra-ui/react";
import axios from "axios";

import { AiOutlineLike } from "react-icons/ai";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { AddContext } from "../context/AppContext";
import { SimpleGrid } from "@chakra-ui/react";
const getData = (token) => {
  return axios({
    method: "GET",
    url: "https://tan-uptight-oyster.cyclic.app/post",
    headers: {
      Authorization: token,
    },
  });
};

const updateLikes = (token, payload) => {
  return axios({
    method: "PATCH",
    url: `https://tan-uptight-oyster.cyclic.app/post/${payload._id}`,
    data: payload,
    headers: {
      Authorization: token,
    },
  });
};

const deletePost = (id, token) => {
  return axios({
    method: "DELETE",
    url: `https://tan-uptight-oyster.cyclic.app/post/${id}`,
    headers: {
      Authorization: token,
    },
  });
};

const Feed = () => {
  const { refresh } = React.useContext(AddContext);
  const [data, setData] = useState([]);

  const [like, setLike] = useState(0);

  const toast = useToast();

  const token = localStorage.getItem("token");
  const handleGet = () => {
    getData(token)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  const handleLikes = (el) => {
    el.like++;
    updateLikes(token, el)
      .then((res) => {
        handleGet();
      })
      .catch((err) => console.warn(err));
  };

  const handleDelete = (id) => {
    deletePost(id, token)
      .then((res) => {
        toast({
          status: "success",
          title: "Post Deleted Successfully!",
          isClosable: true,
          duration: 5000,
        });
        handleGet();
      })
      .catch((err) => {
        toast({
          status: "error",
          title: "Something went wrong while deleting.",
          isClosable: true,
          duration: 5000,
        });
      });
  };

  useEffect(() => {
    handleGet();
  }, [refresh]);

  return (
    <Box className="main">
      <SimpleGrid
        columns={[1, 2, null, 3]}
        // display="flex"
        justifyContent="space-evenly"
        spacing={10}
      >
        {data &&
          data?.map((el) => {
            return (
              <Box
                boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px;"
                key={el?._id}
                p="20px"
              >
                <Text fontSize="30px" fontWeight="bold">
                  <span>{el?.description}</span>
                  <span style={{ color: "red", fontSize: "30px" }}>
                    <RiDeleteBin6Line onClick={() => handleDelete(el?._id)} />
                  </span>
                </Text>
                <Image
                  h="400px"
                  w="400px"
                  src={el?.image}
                  alt={el?.description}
                  onDoubleClick={() => handleLikes(el)}
                  loading="lazy"
                />
                {el?.like > 0 && (
                  <Text fontSize="20px">
                    <FcLike />
                    <span>
                      {el?.like === 0 ? "" : el.like}{" "}
                      {el?.like < 2 ? "Like" : "Likes"}
                    </span>
                  </Text>
                )}
                <Divider />
                <AiOutlineLike
                  className="icon"
                  onClick={() => handleLikes(el)}
                />
              </Box>
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Feed;
