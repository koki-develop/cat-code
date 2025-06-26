import { Box, Text } from "ink";
import InkSpinner from "ink-spinner";
import type React from "react";

export const Spinner: React.FC = () => {
  return (
    <Box marginBottom={1} paddingLeft={2}>
      <Text color="cyan">
        <InkSpinner type="dots" />
      </Text>
      <Text color="yellow"> Thinking...</Text>
    </Box>
  );
};
