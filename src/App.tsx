import { Box, Text, useApp, useInput } from "ink";
import type React from "react";
import { useEffect, useRef, useState } from "react";
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
  const [showExitWarning, setShowExitWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { exit } = useApp();

  // Handle double Ctrl+C exit
  useInput((input, key) => {
    if (key.ctrl && input === "c") {
      if (!showExitWarning) {
        setShowExitWarning(true);

        // Clear timeout if it exists
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set timeout to reset warning after 3 seconds
        timeoutRef.current = setTimeout(() => {
          setShowExitWarning(false);
          timeoutRef.current = null;
        }, 3000);
      } else {
        // Second Ctrl+C within timeout - exit immediately
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        exit();
      }
    } else if (showExitWarning) {
      // Cancel Ctrl+C exit when any other input is detected
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShowExitWarning(false);
    }
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
          text: response.text,
          sender: "cat",
          action: response.action,
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
      {showExitWarning && (
        <Box paddingX={1} marginTop={1}>
          <Text color="yellow">
            Press Ctrl+C again within 3 seconds to exit
          </Text>
        </Box>
      )}
    </Box>
  );
};
