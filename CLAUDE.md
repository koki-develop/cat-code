# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Build**: `bun run build` - Uses the custom build script in `scripts/build.ts`
- **Lint**: `bun run lint` - Runs Biome linter checks
- **Format**: `bun run fmt` - Formats code using Biome with unsafe fixes
- **Type check**: `bun run typecheck` - Runs TypeScript compiler without emitting files
- **Test locally**: `bun run ./dist/index.js` - Run the built CLI locally
- **Run tests**: `bun test` - Runs all test files (*.spec.ts)
- **Run single test**: `bun test src/lib/util.spec.ts` - Run specific test file

## Project Architecture

This is a terminal-based chat UI CLI tool that simulates a conversation with a cat. The architecture consists of:

### Core Components
- **CLI Entry Point** (`src/index.tsx`): Commander.js setup that renders the Ink app
- **Chat Application** (`src/App.tsx`): Main state management component for messages and loading state
- **UI Components** (`src/components/`): Modular React components for terminal UI
  - `ChatHistory.tsx`: Message list rendering using Ink's Static component
  - `MessageItem.tsx`: Individual message display component with multi-line indent support
  - `InputField.tsx`: Text input with prompt styling and border
  - `Spinner.tsx`: Loading indicator during cat responses
  - `types.ts`: Shared TypeScript interfaces
- **Business Logic** (`src/lib/`): Core functionality and utilities
  - `cat.ts`: Cat class with async response generation
  - `util.ts`: Reusable utility functions (e.g., indent for text formatting)
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
- **Loading States**: Displays cyan spinner with "Thinking..." during cat response delay
- **Input Management**: Disables cursor and prevents duplicate submissions during loading
- **Cat Behavior**: Cat class provides async responses with "ﾆｬｰ" after 500ms delay
- **Message Styling**: User messages prefixed with "> " in gray, cat messages in cyan with left padding
- **Multi-line Support**: User messages use indent utility for proper 2+ line formatting

### Build Process
The build process creates a standalone executable CLI tool:
1. Removes existing `dist/` directory
2. Uses Bun.build() to bundle TypeScript/TSX to JavaScript
3. Adds Node.js shebang for CLI execution
4. Makes output executable with chmod +x

### Component Architecture
The codebase follows a modular component structure:
- **State Management**: Centralized in `App.tsx` using React hooks with Date.now() for unique message IDs
- **Component Separation**: Each UI piece is a separate component with clear responsibilities
- **Type Safety**: Shared types in `components/types.ts` for consistency
- **Prop Interface**: Components receive specific props rather than accessing global state
- **Utility Functions**: Common functions in `src/lib/util.ts` with comprehensive test coverage

## Development Notes

- Entry point is TSX (not TS) to support JSX syntax for Ink components
- Uses `"module": "Preserve"` and `"moduleResolution": "bundler"` in tsconfig for modern bundler compatibility
- Biome is configured with strict rules including unused variable/import detection
- Package is configured as ESM with `"type": "module"`
- Binary is published as `cat-code` command via `bin` field in package.json
- Message state uses simple array with Date.now() IDs to prevent duplicates
- Color scheme: gray for user messages, cyan for cat messages and spinner, yellow for input prompt
- Components are split into separate files in `src/components/` for maintainability
- Test files use `.spec.ts` naming convention and bun:test framework
- Utility functions follow options-object pattern for extensibility