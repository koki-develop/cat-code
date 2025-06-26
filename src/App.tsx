import { Box, Static, Text } from "ink";
import TextInput from "ink-text-input";
import type React from "react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
}

export const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "こんにちは！何かお手伝いできることはありますか？",
      sender: "assistant",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // シンプルな応答を追加
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: `「${input}」についてお答えします。`,
        sender: "assistant",
      };
      setMessages((prev) => [...prev, response]);
    }, 500);
  };

  return (
    <Box flexDirection="column">
      <Static items={messages}>
        {(message) => (
          <Box key={message.id} marginBottom={1}>
            <Text color={message.sender === "user" ? "cyan" : "green"}>
              {message.sender === "user" ? "あなた" : "アシスタント"}:{" "}
              {message.text}
            </Text>
          </Box>
        )}
      </Static>
      <Box>
        <Text color="yellow">入力: </Text>
        <TextInput value={input} onChange={setInput} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};
