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
- **Test cat**: `bun test src/lib/cat.spec.ts` - Run cat vocabulary and emotion detection tests
- **Development**: `bun run src/index.tsx` - Run the app directly without building
- **Install globally**: `bun link` - Install as global `cat-code` command for testing

## Project Architecture

This is a terminal-based chat UI CLI tool that simulates a conversation with a cat. The architecture consists of:

### Core Components
- **CLI Entry Point** (`src/index.tsx`): Commander.js setup that renders the Ink app
- **Chat Application** (`src/App.tsx`): Main state management component for messages and loading state
- **UI Components** (`src/components/`): Modular React components for terminal UI
  - `ChatHistory.tsx`: Message list rendering using Ink's Static component
  - `MessageItem.tsx`: Individual message display component with multi-line indent support, user messages prefixed with "> ", cat messages with "⏺"
  - `InputField.tsx`: Custom text input with advanced terminal-style keybindings using `useInput` hook
  - `Spinner.tsx`: Loading indicator during cat responses
  - `types.ts`: Shared TypeScript interfaces
- **Business Logic** (`src/lib/`): Core functionality and utilities
  - `cat.ts`: Cat class with emotion-based response generation and vocabulary system
  - `util.ts`: Reusable utility functions (e.g., indent for text formatting)
- **Build System** (`scripts/build.ts`): Custom Bun build script that creates executable CLI binary

### Technology Stack
- **Runtime**: Bun (primary development runtime)
- **CLI Framework**: Commander.js for argument parsing
- **Terminal UI**: Ink (React for CLIs) with built-in hooks
  - `ink-spinner` for loading states
- **Build Tool**: Custom Bun build script that creates executable CLI binary
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: Bun with lockfile management

### InputField Keybindings
The custom InputField component supports comprehensive terminal-style keybindings:
- **Cursor Movement**: Arrow keys, Ctrl+b/f (left/right), Ctrl+n/p (up/down), Ctrl+a/e (home/end)
- **Text Editing**: Backspace/Delete (delete before cursor), Ctrl+d (delete at cursor), Ctrl+w (delete word), Ctrl+u (delete to line start), Ctrl+k (delete to line end), Ctrl+l (clear input)
- **Multi-line Support**: Full cursor navigation and editing across multiple lines
- **Ink Quirk**: Both `key.backspace` and `key.delete` events represent the physical backspace key

### Chat UI Design Patterns
- **Message Persistence**: Uses Ink's `<Static>` component to render chat history that doesn't re-render
- **Loading States**: Displays cyan spinner with "Thinking..." during cat response delay
- **Input Management**: Disables cursor and prevents duplicate submissions during loading
- **Cat Behavior**: Cat class provides contextual responses based on detected emotions, with random delay (300-1300ms) for realistic interaction
- **Message Styling**: User messages prefixed with "> " in gray, cat messages prefixed with "⏺ " in cyan
- **Multi-line Support**: Both user and cat messages use indent utility for proper 2+ line formatting
- **Exit Control**: Double Ctrl+C required within 500ms to exit, single Ctrl+C clears input

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

## Cat Intelligence System

The cat response system uses emotion detection and vocabulary mapping:

### Emotion Detection
- **Keyword Matching**: User input is analyzed for emotional keywords (case-insensitive)
- **7 Categories**: greeting, affection, satisfaction, excitement, playful, sleepy, hungry
- **Fallback**: Unrecognized input defaults to basic cat sounds

### Vocabulary System
- **Half-width Katakana**: All responses use consistent ﾆｬｰ-style formatting
- **Contextual Responses**: Each emotion category has 2-3 unique vocalizations
- **Random Selection**: Responses are randomly chosen from appropriate category
- **Expandable**: New emotions and sounds can be easily added to vocabulary maps

### Cat Response Patterns
- **Greeting**: ﾆｬｯ, ﾐｬｯ, ﾆｬ (for hellos, introductions)
- **Affection**: ﾆｬｵ~ﾝ, ﾐｬｵ~, ﾆｬﾝﾆｬﾝ (for love, cute, petting)
- **Satisfaction**: ｺﾞﾛｺﾞﾛ, ﾆｬ~ (for thanks, happiness)
- **Excitement**: ﾆｬﾆｬﾆｬ!, ﾐｬｰ!, ﾆｬｯﾆｬｯ (for play, fun)
- **Playful**: ﾆｬｰﾝ, ﾐｬﾐｬ, ﾆｬｵｯ (for games, toys)
- **Sleepy**: ﾆｬ…, ﾌﾆｬ~, ﾆｬ~ﾝ (for tired, sleep)
- **Hungry**: ﾆｬｵｫﾝ, ﾐｬｰｵ, ﾆｬﾝﾆｬﾝ! (for food, eating)
- **Default**: ﾆｬｰ, ﾆｬﾝ, ﾐｬｰ (for unrecognized input)

## File Editing System

The cat occasionally "plays" with code files, making random edits and showing diffs:

### Core Architecture
- **FileEditor Class** (`src/lib/fileEditor.ts`): Handles file selection, editing, and diff generation
- **Git Integration** (`src/lib/git.ts`): Abstraction layer for git operations using simple-git
- **EditAction Component** (`src/components/EditAction.tsx`): Displays file diffs with Claude Code-style formatting
- **Action System** (`src/components/types.ts`): Structured type definitions for extensible action handling

### File Editing Behavior
- **Trigger Probability**: 20% chance during cat responses (configurable in `cat.ts`)
- **File Selection**: Prefers git-tracked files, falls back to glob patterns for text files
- **Cat Word Replacement**: Randomly replaces words line-by-line with cat sounds (ﾆｬｰ, ﾐｬｰ, etc.) using streaming for memory efficiency
- **Supported File Types**: txt, md, js, jsx, ts, tsx, json, css, html, xml, yml, yaml
- **Memory Optimization**: Uses streaming with per-line processing to handle large files efficiently

### Diff Display System
- **ANSI256 Colors**: Uses ansi256(52) for deletions (red background), ansi256(22) for additions (green background)
- **Structured Format**: Line numbers in gray, `- content` for deletions, `+ content` for additions
- **Component Integration**: EditAction appears before cat message when file editing occurs
- **Message Architecture**: Uses action-based message system with optional action field

### Git Integration Patterns
- **Repository Detection**: Automatically detects git initialization status
- **File Tracking**: Uses `git ls-files` for tracked file enumeration
- **Fallback Strategy**: Glob-based file discovery when git is unavailable
- **Text File Filtering**: Consistent file type detection across both git and glob methods