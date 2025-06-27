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

    render(<App safeMode={!!options.safe} />, {
      exitOnCtrlC: false, // Disable default Ctrl+C exit behavior
    });
  });

program.parse(process.argv);
