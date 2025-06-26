# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Build**: `bun run build` - Uses the custom build script in `scripts/build.ts`
- **Lint**: `bun run lint` - Runs Biome linter checks
- **Format**: `bun run fmt` - Formats code using Biome with unsafe fixes
- **Type check**: `bun run typecheck` - Runs TypeScript compiler without emitting files
- **Test locally**: `bun run ./dist/index.js` - Run the built CLI locally

## Project Architecture

This is a terminal-based chat UI CLI tool that simulates a conversation with a cat. The architecture consists of:

### Core Components
- **CLI Entry Point** (`src/index.tsx`): Commander.js setup that renders the Ink app
- **Chat Application** (`src/App.tsx`): React-based terminal UI using Ink framework
- **Build System** (`scripts/build.ts`): Custom Bun build script that creates executable CLI binary

### Technology Stack
- **Runtime**: Bun (primary development runtime)
- **CLI Framework**: Commander.js for argument parsing
- **Terminal UI**: Ink (React for CLIs) with community components:
  - `ink-text-input` for user input
  - `ink-spinner` for loading states
- **Build Tool**: Custom Bun build script that creates executable CLI binary
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: Bun with lockfile management

### Chat UI Design Patterns
- **Message Persistence**: Uses Ink's `<Static>` component to render chat history that doesn't re-render
- **Loading States**: Displays spinner with "Thinking..." during cat response delay
- **Input Management**: Disables cursor and prevents duplicate submissions during loading
- **Cat Behavior**: Always responds with "ﾆｬｰ" after a 500ms delay to simulate thinking

### Build Process
The build process creates a standalone executable CLI tool:
1. Removes existing `dist/` directory
2. Uses Bun.build() to bundle TypeScript/TSX to JavaScript
3. Adds Node.js shebang for CLI execution
4. Makes output executable with chmod +x

### Key Files
- `src/index.tsx` - Main entry point with Commander.js CLI setup (TSX for JSX support)
- `src/App.tsx` - Main chat UI component with React hooks and Ink components
- `scripts/build.ts` - Custom build script that outputs to `dist/` with shebang
- `biome.json` - Biome configuration for linting and formatting
- `tsconfig.json` - TypeScript configuration optimized for bundler mode with JSX support

## Development Notes

- Entry point is TSX (not TS) to support JSX syntax for Ink components
- Uses `"module": "Preserve"` and `"moduleResolution": "bundler"` in tsconfig for modern bundler compatibility
- Biome is configured with strict rules including unused variable/import detection
- Package is configured as ESM with `"type": "module"`
- Binary is published as `cat-code` command via `bin` field in package.json
- Message state uses simple array with auto-incrementing IDs (length + 1/2)
- Color scheme: cyan for user messages, green for cat messages, yellow for prompt