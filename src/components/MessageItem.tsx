import { Box, Text } from "ink";
import type React from "react";
import type { Message } from "./types";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <Box marginBottom={1}>
      <Text color={message.sender === "user" ? "cyan" : "green"}>
        {message.text}
      </Text>
    </Box>
  );
};
