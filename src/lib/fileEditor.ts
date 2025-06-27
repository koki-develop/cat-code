import { readFile, writeFile } from "node:fs/promises";
import { glob } from "glob";
import type { Diff, FileDiff } from "../components/types";
import { Git } from "./git";

export class FileEditor {
  private git = new Git();
  // Text file extension patterns
  // TODO: enhance these patterns
  private readonly textFilePatterns = [
    "**/*.txt",
    "**/*.md",
    "**/*.js",
    "**/*.jsx",
    "**/*.ts",
    "**/*.tsx",
    "**/*.json",
    "**/*.css",
    "**/*.html",
    "**/*.xml",
    "**/*.yml",
    "**/*.yaml",
  ];

  // Cat word candidates
  private readonly catWords = [
    "ﾆｬｰ",
    "ﾐｬｰ",
    "ﾆｬﾝ",
    "ﾐｬﾝ",
    "ﾆｬｯ",
    "ﾐｬｯ",
    "ﾆｬｵ~ﾝ",
    "ﾐｬｵ~",
    "ｺﾞﾛｺﾞﾛ",
  ];

  /**
   * Get files under git management (when git is initialized)
   */
  private async getGitTrackedFiles(): Promise<string[]> {
    const gitFiles = await this.git.lsFiles();
    return gitFiles.filter((file) => this.isTextFile(file));
  }

  /**
   * Search for text files (fallback when git is not initialized)
   */
  private async getTextFiles(): Promise<string[]> {
    return await glob(this.textFilePatterns);
  }

  /**
   * Determine if a file is a text file
   */
  private isTextFile(filePath: string): boolean {
    const extension = filePath.split(".").pop()?.toLowerCase();
    const textExtensions = [
      "txt",
      "md",
      "js",
      "ts",
      "tsx",
      "json",
      "css",
      "html",
      "xml",
      "yml",
      "yaml",
    ];
    return textExtensions.includes(extension || "");
  }

  /**
   * Select a file randomly
   */
  async selectRandomFile(): Promise<string | null> {
    let files: string[];

    // Check if git is initialized
    if (await this.git.isInited()) {
      files = await this.getGitTrackedFiles();
    } else {
      files = await this.getTextFiles();
    }

    if (files.length === 0) {
      return null;
    }

    const randomIndex = Math.floor(Math.random() * files.length);
    return files[randomIndex] as string;
  }

  /**
   * Edit file content in a cat-like manner
   */
  private editFileContent(content: string): string {
    const words = content.match(/\w+/g);
    if (!words || words.length === 0) return content;

    const targetWord = words[
      Math.floor(Math.random() * words.length)
    ] as string;
    const catWord = this.catWords[
      Math.floor(Math.random() * this.catWords.length)
    ] as string;

    // Replace up to 3 locations
    let replacedContent = content;
    let replacementCount = 0;
    const maxReplacements = 3;

    replacedContent = replacedContent.replace(
      new RegExp(`\\b${targetWord}\\b`, "g"),
      (match) => {
        if (replacementCount < maxReplacements) {
          replacementCount++;
          return catWord;
        }
        return match;
      },
    );

    return replacedContent;
  }

  /**
   * Generate structured diff
   */
  private generateDiffs(original: string, edited: string): Diff[] {
    const originalLines = original.split("\n");
    const editedLines = edited.split("\n");
    const diffs: Diff[] = [];

    const maxLines = Math.max(originalLines.length, editedLines.length);

    for (let i = 0; i < maxLines; i++) {
      const rowNumber = i + 1;
      const originalLine = originalLines[i] || "";
      const editedLine = editedLines[i] || "";

      if (originalLine !== editedLine) {
        diffs.push({
          rowNumber,
          a: originalLine,
          b: editedLine,
        });
      }
    }

    return diffs;
  }

  /**
   * Edit file and generate diff
   */
  async edit(): Promise<FileDiff | null> {
    const filePath = await this.selectRandomFile();
    if (!filePath) {
      return null;
    }

    // Read file content
    const originalContent = await readFile(filePath, "utf-8");

    // Edit
    const editedContent = this.editFileContent(originalContent);

    // Write to file
    await writeFile(filePath, editedContent, "utf-8");

    // Generate structured diff
    const diffs = this.generateDiffs(originalContent, editedContent);
    if (diffs.length === 0) {
      return null;
    }

    return {
      fileName: filePath,
      diffs,
    };
  }
}
