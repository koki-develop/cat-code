import simpleGit from "simple-git";

export class Git {
  private git = simpleGit();

  async isInited(): Promise<boolean> {
    return await this.git
      .status()
      .then(() => true)
      .catch(() => false);
  }

  async lsFiles(): Promise<string[]> {
    const gitFiles = await this.git.raw(["ls-files"]);
    return gitFiles
      .trim()
      .split("\n")
      .filter((file) => file.trim() !== "");
  }
}
