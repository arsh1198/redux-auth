import React from "react";
import { Flex, Spinner } from "@twilio-paste/core";

const LoadingSpinner = () => {
  return (
    <Flex height="100vh" hAlignContent="center" vAlignContent="center">
      <Spinner size="sizeIcon80" decorative={false} title="Loading" />
    </Flex>
  );
};

export default LoadingSpinner;
