import { Command } from "commander";
import { render } from "ink";
import packageJson from "../package.json" with { type: "json" };
import { App } from "./App";

const logo = `
                                                                   ⠀⠀⠀⣀⡀
   ██████╗ █████╗ ████████╗     ██████╗ ██████╗ ██████╗ ███████╗  ⢠⣤⡀⣾⣿⣿⠀⣤⣤⡄
  ██╔════╝██╔══██╗╚══██╔══╝    ██╔════╝██╔═══██╗██╔══██╗██╔════╝  ⢿⣿⡇⠘⠛⠁⢸⣿⣿⠃
  ██║     ███████║   ██║       ██║     ██║   ██║██║  ██║█████╗    ⠈⣉⣤⣾⣿⣿⡆⠉⣴⣶⣶
  ██║     ██╔══██║   ██║       ██║     ██║   ██║██║  ██║██╔══╝    ⣾⣿⣿⣿⣿⣿⣿⡀⠻⠟⠃
  ╚██████╗██║  ██║   ██║       ╚██████╗╚██████╔╝██████╔╝███████╗  ⠙⠛⠻⢿⣿⣿⣿⡇
   ╚═════╝╚═╝  ╚═╝   ╚═╝        ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝  ⠀⠀⠀⠀⠈⠙⠋⠁
`;

const program = new Command();

program
  .name("cat-code")
  .version(packageJson.version)
  .action(() => {
    console.log(logo);

    render(<App />);
  });

program.parse(process.argv);
