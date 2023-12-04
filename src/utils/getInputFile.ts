import path from "path";
import { isFile } from "@foxkit/node-util/fs";
import { readFile } from "fs/promises";

/**
 * Reads an input file either from provided path or `process.argv[2]`
 * (first parameter)
 * @param argOverride Optionally override path that's read (default: argv[2])
 * @returns File Content as String
 */
export async function getInputFileAsString(argOverride?: string) {
  const arg = argOverride ?? process.argv[2];

  if (!arg) {
    throw new Error("Must provide path to input file");
  }

  const filePath = path.resolve(arg);

  if (!(await isFile(filePath))) {
    throw new Error(`Could not find input file '${arg}'`);
  }

  return readFile(filePath, "utf-8");
}

/**
 * Reads an input file either from provided path or `process.argv[2]`
 * (first parameter), normalizes newline characters, trims trailing newlines and
 * splits the input into lines.
 * @param argOverride Optionally override path that's read (default: argv[2])
 * @returns File Content in lines as Array of strings
 */
export async function getInputFileAsLines(argOverride?: string) {
  const content = await getInputFileAsString(argOverride);
  return content.replace(/\r\n/g, "\n").replace(/\n+$/, "").split("\n");
}
