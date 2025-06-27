import chalk from "chalk";
import { Command } from "commander";
import { render } from "ink";
import packageJson from "../package.json" with { type: "json" };
import { App } from "./App";

const logo = `                                                                                                                                                         ${chalk.yellow("⣀⡀")}
  ${chalk.cyan(" ██████╗ █████╗ ████████╗")}    ${chalk.cyan(" ██████╗ ██████╗ ██████╗ ███████╗")}  ${chalk.yellow("⢠⣤⡀⣾⣿⣿⠀⣤⣤⡀")}
  ${chalk.cyan("██╔════╝██╔══██╗╚══██╔══╝")}    ${chalk.cyan("██╔════╝██╔═══██╗██╔══██╗██╔════╝")}  ${chalk.yellow("⢿⣿⡇⠘⠛⠁⢸⣿⣿⠃")}
  ${chalk.cyan("██║     ███████║   ██║   ")}    ${chalk.cyan("██║     ██║   ██║██║  ██║█████╗  ")}  ${chalk.yellow("⠈⣉⣤⣾⣿⣿⡆⠉⣴⣶⣦")}
  ${chalk.cyan("██║     ██╔══██║   ██║   ")}    ${chalk.cyan("██║     ██║   ██║██║  ██║██╔══╝  ")}  ${chalk.yellow("⣾⣿⣿⣿⣿⣿⣿⡀⠻⠟⠃")}
  ${chalk.cyan("╚██████╗██║  ██║   ██║   ")}    ${chalk.cyan("╚██████╗╚██████╔╝██████╔╝███████╗")}  ${chalk.yellow("⠙⠛⠻⢿⣿⣿⣿⡇")}
  ${chalk.cyan(" ╚═════╝╚═╝  ╚═╝   ╚═╝   ")}    ${chalk.cyan(" ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝")}  ${chalk.yellow("⠀⠀⠀⠀⠈⠙⠋⠁")}
`;

const program = new Command();

program
  .name("cat-code")
  .version(packageJson.version)
  .option("--safe", "enable safe mode (no actual file modifications)")
  .action((options) => {
    console.log(logo);

    const safeMode = !!options.safe;
    if (!safeMode) {
      console.log(
        chalk.yellow(
          " ⚠️ WARNING: Safe mode is disabled. The cat may modify your files!",
        ),
      );
      console.log(
        chalk.gray(
          "   Use --safe flag to preview changes without modifying files.",
        ),
      );
      console.log();
    }

    render(<App safeMode={safeMode} />, {
      exitOnCtrlC: false, // Disable default Ctrl+C exit behavior
    });
  });

program.parse(process.argv);
