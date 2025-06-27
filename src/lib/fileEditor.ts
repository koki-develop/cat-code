import { createReadStream, createWriteStream } from "node:fs";
import { rename } from "node:fs/promises";
import { createInterface } from "node:readline";
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
   * Replace a random word in a line with a cat word
   */
  private replaceRandomWord(line: string): {
    edited: string;
    original: string;
    replaced: boolean;
  } {
    const words = line.match(/\b\w+\b/g);
    if (!words || words.length === 0) {
      return { edited: line, original: line, replaced: false };
    }

    // Select random word to replace
    const targetIndex = Math.floor(Math.random() * words.length);
    const targetWord = words[targetIndex] as string;

    // Select random cat word
    const catWord = this.catWords[
      Math.floor(Math.random() * this.catWords.length)
    ] as string;

    // Replace only the first occurrence of the selected word
    let replacementDone = false;
    const edited = line.replace(new RegExp(`\\b${targetWord}\\b`), (match) => {
      if (!replacementDone) {
        replacementDone = true;
        return catWord;
      }
      return match;
    });

    return {
      edited,
      original: line,
      replaced: edited !== line,
    };
  }

  /**
   * Edit file efficiently using readline
   */
  private async editFileReadline(filePath: string): Promise<{ diffs: Diff[] }> {
    const tempPath = `${filePath}.tmp`;
    const diffs: Diff[] = [];

    let totalReplacements = 0;
    const maxReplacements = 3;
    const replacementProbability = 0.2; // 20% chance to edit a line

    // Process file line by line
    const readStream = createReadStream(filePath);
    const writeStream = createWriteStream(tempPath);
    const rl = createInterface({
      input: readStream,
      crlfDelay: Number.POSITIVE_INFINITY,
    });

    let lineNumber = 0;
    for await (const line of rl) {
      lineNumber++;
      let editedLine = line;

      // Decide whether to edit this line
      if (
        totalReplacements < maxReplacements &&
        Math.random() < replacementProbability
      ) {
        const result = this.replaceRandomWord(line);

        if (result.replaced) {
          editedLine = result.edited;
          totalReplacements++;

          diffs.push({
            rowNumber: lineNumber,
            a: result.original,
            b: editedLine,
          });
        }
      }

      writeStream.write(`${editedLine}\n`);
    }

    writeStream.end();
    await new Promise<void>((resolve) => writeStream.on("finish", resolve));

    // Atomically replace original file
    await rename(tempPath, filePath);

    return { diffs };
  }

  /**
   * Edit file and generate diff
   */
  async edit(): Promise<FileDiff | null> {
    const filePath = await this.selectRandomFile();
    if (!filePath) {
      return null;
    }

    // Edit file using readline for efficiency
    const { diffs } = await this.editFileReadline(filePath);

    if (diffs.length === 0) {
      return null;
    }

    return {
      fileName: filePath,
      diffs,
    };
  }
}
