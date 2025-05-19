"use client"

import { ChakraProvider, ColorModeProvider as ChakraColorModeProvider } from "@chakra-ui/react"
import * as React from "react"

interface ProviderProps {
  children: React.ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return (
    <ChakraProvider>
      <ChakraColorModeProvider>{children}</ChakraColorModeProvider>
    </ChakraProvider>
  )
}
