interface IndentOptions {
  skipFirstLine?: boolean;
}

export function indent(text: string, options: IndentOptions = {}): string {
  const { skipFirstLine = true } = options;
  const lines = text.split("\n");

  return lines
    .map((line, index) => {
      if (skipFirstLine && index === 0) {
        return line;
      }
      return `  ${line}`;
    })
    .join("\n");
}
