"use client";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

// Own file so Chakra is split into its own chunk and the home page never loads it.
const ChakraShell = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider>{children}</ChakraProvider>
);

export default ChakraShell;
