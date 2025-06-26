import { Box, Static, Text } from "ink";
import Spinner from "ink-spinner";
import TextInput from "ink-text-input";
import type React from "react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "cat";
}

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
      <Static items={messages}>
        {(message) => (
          <Box key={message.id} marginBottom={1}>
            <Text color={message.sender === "user" ? "cyan" : "green"}>
              {message.text}
            </Text>
          </Box>
        )}
      </Static>
      {isLoading && (
        <Box>
          <Spinner type="dots" />
          <Text> Thinking...</Text>
        </Box>
      )}
      <Box>
        <Text color="yellow">&gt; </Text>
        <TextInput
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          showCursor={!isLoading}
        />
      </Box>
    </Box>
  );
};
