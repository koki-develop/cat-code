import { Box, Text, useInput } from "ink";
import type React from "react";
import { useCallback, useMemo, useState } from "react";

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
  const [cursorPosition, setCursorPosition] = useState(value.length);

  const lines = useMemo(() => value.split("\n"), [value]);
  const { currentLineIndex, currentColumnIndex } = useMemo(() => {
    let pos = 0;
    for (let i = 0; i < lines.length; i++) {
      if (pos + (lines[i]?.length || 0) >= cursorPosition) {
        return {
          currentLineIndex: i,
          currentColumnIndex: cursorPosition - pos,
        };
      }
      pos += (lines[i]?.length || 0) + 1; // +1 for newline
    }
    return {
      currentLineIndex: lines.length - 1,
      currentColumnIndex: lines[lines.length - 1]?.length || 0,
    };
  }, [lines, cursorPosition]);

  const updateValue = useCallback(
    (newValue: string, newCursorPos?: number) => {
      onChange(newValue);
      if (newCursorPos !== undefined) {
        setCursorPosition(Math.max(0, Math.min(newValue.length, newCursorPos)));
      }
    },
    [onChange],
  );

  useInput(
    useCallback(
      (input, key) => {
        if (!showCursor) return;

        if (key.return) {
          onSubmit();
          return;
        }

        if (key.backspace) {
          if (cursorPosition > 0) {
            const newValue =
              value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
            updateValue(newValue, cursorPosition - 1);
          }
          return;
        }

        // Delete character at cursor position (Delete key and Ctrl+d)
        if (key.delete || (key.ctrl && input === "d")) {
          if (cursorPosition < value.length) {
            const newValue =
              value.slice(0, cursorPosition) + value.slice(cursorPosition + 1);
            updateValue(newValue, cursorPosition);
          }
          return;
        }

        // Cursor movement
        if (key.leftArrow || (key.ctrl && input === "b")) {
          setCursorPosition(Math.max(0, cursorPosition - 1));
          return;
        }

        if (key.rightArrow || (key.ctrl && input === "f")) {
          setCursorPosition(Math.min(value.length, cursorPosition + 1));
          return;
        }

        if (key.upArrow || (key.ctrl && input === "p")) {
          if (currentLineIndex > 0) {
            const prevLineLength = lines[currentLineIndex - 1]?.length || 0;
            const newColumnIndex = Math.min(currentColumnIndex, prevLineLength);
            let newPos = 0;
            for (let i = 0; i < currentLineIndex - 1; i++) {
              newPos += (lines[i]?.length || 0) + 1;
            }
            newPos += newColumnIndex;
            setCursorPosition(newPos);
          }
          return;
        }

        if (key.downArrow || (key.ctrl && input === "n")) {
          if (currentLineIndex < lines.length - 1) {
            const nextLineLength = lines[currentLineIndex + 1]?.length || 0;
            const newColumnIndex = Math.min(currentColumnIndex, nextLineLength);
            let newPos = 0;
            for (let i = 0; i <= currentLineIndex; i++) {
              newPos += (lines[i]?.length || 0) + 1;
            }
            newPos += newColumnIndex;
            setCursorPosition(newPos);
          }
          return;
        }

        // Home/End
        if (key.ctrl && input === "a") {
          let lineStartPos = 0;
          for (let i = 0; i < currentLineIndex; i++) {
            lineStartPos += (lines[i]?.length || 0) + 1;
          }
          setCursorPosition(lineStartPos);
          return;
        }

        if (key.ctrl && input === "e") {
          let lineEndPos = 0;
          for (let i = 0; i <= currentLineIndex; i++) {
            lineEndPos += lines[i]?.length || 0;
            if (i < currentLineIndex) lineEndPos += 1;
          }
          setCursorPosition(lineEndPos);
          return;
        }

        // Kill line from cursor to beginning
        if (key.ctrl && input === "u") {
          let lineStartPos = 0;
          for (let i = 0; i < currentLineIndex; i++) {
            lineStartPos += (lines[i]?.length || 0) + 1;
          }
          const newValue =
            value.slice(0, lineStartPos) + value.slice(cursorPosition);
          updateValue(newValue, lineStartPos);
          return;
        }

        // Kill word backward
        if (key.ctrl && input === "w") {
          const beforeCursor = value.slice(0, cursorPosition);
          // Find the start of the word to delete
          let wordStart = cursorPosition;

          // Skip trailing whitespace
          while (
            wordStart > 0 &&
            /\s/.test(beforeCursor[wordStart - 1] || "")
          ) {
            wordStart--;
          }

          // Find the beginning of the word
          while (
            wordStart > 0 &&
            !/\s/.test(beforeCursor[wordStart - 1] || "")
          ) {
            wordStart--;
          }

          const newValue =
            value.slice(0, wordStart) + value.slice(cursorPosition);
          updateValue(newValue, wordStart);
          return;
        }

        // Kill line from cursor to end
        if (key.ctrl && input === "k") {
          let lineEndPos = 0;
          for (let i = 0; i <= currentLineIndex; i++) {
            lineEndPos += lines[i]?.length || 0;
            if (i < currentLineIndex) lineEndPos += 1;
          }
          const newValue =
            value.slice(0, cursorPosition) + value.slice(lineEndPos);
          updateValue(newValue, cursorPosition);
          return;
        }

        // Clear input (like screen clear in terminal)
        if (key.ctrl && input === "l") {
          updateValue("", 0);
          return;
        }

        // Regular character input
        if (input && !key.ctrl && !key.meta) {
          const newValue =
            value.slice(0, cursorPosition) +
            input +
            value.slice(cursorPosition);
          updateValue(newValue, cursorPosition + input.length);
        }
      },
      [
        value,
        cursorPosition,
        currentLineIndex,
        currentColumnIndex,
        lines,
        showCursor,
        onSubmit,
        updateValue,
      ],
    ),
  );

  const renderText = useMemo(() => {
    if (!showCursor) {
      return value || <Text color="gray">Talk to the cat...</Text>;
    }

    if (value.length === 0) {
      return (
        <Text>
          <Text inverse> </Text>
        </Text>
      );
    }

    const beforeCursor = value.slice(0, cursorPosition);
    const cursorChar = value.slice(cursorPosition, cursorPosition + 1);
    const afterCursor = value.slice(cursorPosition + 1);

    // Handle cursor display for newline characters and end of text
    let displayCursorChar = cursorChar;
    if (cursorChar === "\n") {
      displayCursorChar = " ";
    } else if (cursorChar === "") {
      displayCursorChar = " ";
    }

    return (
      <Text>
        {beforeCursor}
        <Text inverse>{displayCursorChar}</Text>
        {cursorChar === "\n" ? "\n" : ""}
        {afterCursor}
      </Text>
    );
  }, [value, cursorPosition, showCursor]);

  return (
    <Box borderStyle="single" borderColor="gray" paddingX={1}>
      <Text color="yellow">&gt; </Text>
      {renderText}
    </Box>
  );
};
