import { Box, Text } from "ink";
import type React from "react";
import type { Message } from "./types";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <Box marginBottom={1} paddingLeft={isUser ? 0 : 2}>
      <Text color={isUser ? "gray" : "green"}>
        {isUser ? `> ${message.text}` : message.text}
      </Text>
    </Box>
  );
};
