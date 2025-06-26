import { Static } from "ink";
import type React from "react";
import { MessageItem } from "./MessageItem";
import type { Message } from "./types";

interface ChatHistoryProps {
  messages: Message[];
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <Static items={messages}>
      {(message) => <MessageItem key={message.id} message={message} />}
    </Static>
  );
};
