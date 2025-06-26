import { Box } from "ink";
import type React from "react";
import { useState } from "react";
import { ChatHistory } from "./components/ChatHistory";
import { InputField } from "./components/InputField";
import { Spinner } from "./components/Spinner";
import type { Message } from "./components/types";
import { Cat } from "./lib/cat";

const cat = new Cat();

export const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (input.trim() === "" || isLoading) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    await cat
      .response(newMessage.text)
      .then((response) => {
        const message: Message = {
          id: Date.now(),
          text: response,
          sender: "cat",
        };
        setMessages((prev) => [...prev, message]);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
