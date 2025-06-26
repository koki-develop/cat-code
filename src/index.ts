import { Command } from "commander";
import packageJson from "../package.json" with { type: "json" };

const program = new Command();

program
  .name("TODO")
  .version(packageJson.version)
  .action(() => {
    console.log("hello world");
  });

program.parse(process.argv);
