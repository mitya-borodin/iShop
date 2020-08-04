import { downloadFile } from "@rtcts/node";
import fs from "fs";
import { Context, Middleware, Next } from "koa";
import path from "path";
import { promisify } from "util";

const exists = promisify(fs.exists);
const stat = promisify(fs.stat);

export const staticFilesMiddleware = (
  contentBases: string[],
  aliases = {},
  paramKey = "0",
): Middleware => {
  return async (ctx: Context, next: Next): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      let originFilePath = ctx.params[paramKey];

      if (Object.prototype.hasOwnProperty.call(aliases, originFilePath)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        originFilePath = aliases[originFilePath];
      }

      const outsidePathToFile = path.normalize(`/${originFilePath}`);

      for (const contentBase of contentBases) {
        if (!(await exists(contentBase))) {
          continue;
        }

        const pathToFile = path.join(contentBase, outsidePathToFile);

        if (!(await exists(pathToFile))) {
          continue;
        }

        const statsOfContent = await stat(pathToFile);

        if (statsOfContent.isDirectory()) {
          continue;
        }

        await downloadFile(ctx, pathToFile);

        return;
      }

      await next();
    } catch (error) {
      ctx.throw(500, error);
    }
  };
};
