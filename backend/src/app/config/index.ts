import { Config as ConfigBase } from "@rtcts/node";
import chalk from "chalk";
import dotenv from "dotenv";
import path from "path";

const rootDir = path.resolve(__dirname, "../../..");

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(rootDir, ".env") });
}

export class Config extends ConfigBase {
  public readonly files: {
    readonly directoryForUploadedFiles: string;
  };

  constructor() {
    super();

    console.log(
      chalk.cyan.bold("directoryForUploadedFiles: "),
      chalk.cyan(process.env.DIRECTORY_FOR_UPLOADED_FILES),
    );
    console.log("");

    this.files = {
      directoryForUploadedFiles: path.resolve(
        rootDir,
        process.env.DIRECTORY_FOR_UPLOADED_FILES || "uploadedFiles",
      ),
    };
  }
}

export const config = new Config();
