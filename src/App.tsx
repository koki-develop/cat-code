import { Box } from "ink";
import type React from "react";
import { useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { InputField } from "./components/InputField";
import { Spinner } from "./components/Spinner";
import type { Message } from "./components/types";

export const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (input.trim() === "" || isLoading) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: "ﾆｬｰ",
        sender: "cat",
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Box flexDirection="column">
      <ChatHistory messages={messages} />
      {isLoading && <Spinner />}
      <InputField
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        showCursor={!isLoading}
      />
    </Box>
  );
};
