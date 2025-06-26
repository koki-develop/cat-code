# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Build**: `bun run build` - Uses the custom build script in `scripts/build.ts`
- **Lint**: `bun run lint` - Runs Biome linter checks
- **Format**: `bun run fmt` - Formats code using Biome with unsafe fixes
- **Type check**: `bun run typecheck` - Runs TypeScript compiler without emitting files

## Project Structure

This is a TypeScript CLI tool using the following stack:
- **Runtime**: Bun (primary development runtime)
- **CLI Framework**: Commander.js for argument parsing
- **Build Tool**: Custom Bun build script that creates executable CLI binary
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)
- **Package Manager**: Bun with lockfile management

### Key Files
- `src/index.ts` - Main entry point with Commander.js CLI setup
- `scripts/build.ts` - Custom build script that outputs to `dist/` with shebang
- `biome.json` - Biome configuration for linting and formatting
- `tsconfig.json` - TypeScript configuration optimized for bundler mode

### Build Process
The build process creates a standalone executable CLI tool:
1. Removes existing `dist/` directory
2. Uses Bun.build() to bundle TypeScript to JavaScript
3. Adds Node.js shebang for CLI execution
4. Makes output executable with chmod +x

## Development Notes

- Uses `"module": "Preserve"` and `"moduleResolution": "bundler"` in tsconfig for modern bundler compatibility
- Biome is configured with strict rules including unused variable/import detection
- Package is configured as ESM with `"type": "module"`
- Binary is published as `cat-code` command via `bin` field in package.json