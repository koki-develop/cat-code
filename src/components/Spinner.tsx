import { Box, Text } from "ink";
import InkSpinner from "ink-spinner";
import type React from "react";

export const Spinner: React.FC = () => {
  return (
    <Box>
      <InkSpinner type="dots" />
      <Text> Thinking...</Text>
    </Box>
  );
};
