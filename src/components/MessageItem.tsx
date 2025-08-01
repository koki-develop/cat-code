import { Box, Text } from "ink";
import type React from "react";
import { indent } from "../lib/util";
import { EditAction } from "./EditAction";
import type { Message } from "./types";

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <Box flexDirection="column" marginBottom={1} paddingLeft={1}>
      {!isUser && message.action?.type === "edit" && (
        <EditAction action={message.action} />
      )}
      <Text color={isUser ? "gray" : undefined}>
        {isUser ? `> ${indent(message.text)}` : `⏺ ${indent(message.text)}`}
      </Text>
    </Box>
  );
};
