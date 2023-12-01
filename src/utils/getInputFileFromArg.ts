import path from "path";
import { isFile } from "@foxkit/node-util/fs";
import { readFile } from "fs/promises";

export async function getInputFileFromArg() {
  const arg = process.argv[2];

  if (!arg) {
    throw new Error("Must provide path to input file");
  }

  const filePath = path.resolve(arg);

  if (!(await isFile(filePath))) {
    throw new Error(`Could not find input file '${arg}'`);
  }

  return readFile(filePath, "utf-8");
}
