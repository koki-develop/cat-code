import { Box, Text } from "ink";
import TextInput from "ink-text-input";
import type React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  showCursor: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onSubmit,
  showCursor,
}) => {
  return (
    <Box>
      <Text color="yellow">&gt; </Text>
      <TextInput
        value={value}
        onChange={onChange}
        onSubmit={onSubmit}
        showCursor={showCursor}
      />
    </Box>
  );
};
