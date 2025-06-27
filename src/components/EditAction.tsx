import chalk from "chalk";
import { Box, Text } from "ink";
import type React from "react";
import type { EditAction as EditActionType } from "./types";

interface EditActionProps {
  action: EditActionType;
}

const formatDiffs = (diffs: EditActionType["diff"]["diffs"]): string => {
  const lines: string[] = [];

  // Calculate max line number width for alignment
  const maxLineNumber = Math.max(...diffs.map((d) => d.rowNumber));
  const lineNumberWidth = maxLineNumber.toString().length;

  for (let i = 0; i < diffs.length; i++) {
    const diff = diffs[i];
    const nextDiff = diffs[i + 1];

    if (!diff) continue;

    const paddedLineNumber = diff.rowNumber
      .toString()
      .padStart(lineNumberWidth, " ");

    // Deleted line
    if (diff.a !== "") {
      lines.push(
        `${chalk.gray(paddedLineNumber)} ${chalk.bgAnsi256(52)(`- ${diff.a}`)}`,
      );
    }
    // Added line
    if (diff.b !== "") {
      lines.push(
        `${chalk.gray(paddedLineNumber)} ${chalk.bgAnsi256(22)(`+ ${diff.b}`)}`,
      );
    }

    // Add empty line if next diff exists and line numbers are not consecutive
    if (nextDiff && nextDiff.rowNumber !== diff.rowNumber + 1) {
      lines.push("");
    }
  }

  return lines.join("\n");
};

export const EditAction: React.FC<EditActionProps> = ({ action }) => {
  return (
    <Box flexDirection="column">
      <Text>
        <Text color="green">⏺</Text> <Text bold>Update</Text>(
        {action.diff.fileName})
        {action.safeMode && (
          <Text color="yellow"> [SAFE MODE - No actual changes]</Text>
        )}
      </Text>
      <Box paddingLeft={2} paddingY={1}>
        <Text>{formatDiffs(action.diff.diffs)}</Text>
      </Box>
    </Box>
  );
};
