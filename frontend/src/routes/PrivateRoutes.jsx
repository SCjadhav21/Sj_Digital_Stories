import React from "react";

import { Navigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const toast = useToast();
  const token = localStorage.getItem("token");

  if (!token) {
    toast({
      status: "warning",
      isClosable: true,
      duration: 5000,
      title: "Login First!",
    });
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};

export default PrivateRoute;
