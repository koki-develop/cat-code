import { Command } from "commander";
import { render } from "ink";
import packageJson from "../package.json" with { type: "json" };
import { App } from "./App";

const program = new Command();

program
  .name("cat-code")
  .version(packageJson.version)
  .description("A simple chat CLI tool")
  .action(() => {
    render(<App />);
  });

program.parse(process.argv);
