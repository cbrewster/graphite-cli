import chalk from "chalk";
import yargs from "yargs";
import { cache } from "../../lib/config";
import { ExitFailedError } from "../../lib/errors";
import { currentBranchPrecondition } from "../../lib/preconditions";
import { profile } from "../../lib/telemetry";
import { gpExecSync, logInfo } from "../../lib/utils";
import { Branch, MetadataRef } from "../../wrapper-classes";

const args = {
  "new-branch-name": {
    describe: `The new name for the current branch`,
    demandOption: true,
    type: "string",
    positional: true,
  },
} as const;
type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;

export const command = "rename <new-branch-name>";
export const description =
  "Rename a branch and update metadata referencing it.";
export const builder = args;

export const handler = async (args: argsT): Promise<void> => {
  return profile(args, async () => {
    const currentBranch = currentBranchPrecondition();
    const oldName = currentBranch.name;
    const newName = args["new-branch-name"];
    const allBranches = Branch.allBranches();

    gpExecSync({ command: `git branch -m ${newName}` }, (err) => {
      throw new ExitFailedError(`Failed to rename the current branch.`, err);
    });

    // Good habit to clear cache after write operations.
    cache.clearAll();

    const curBranchMetadataRef = new MetadataRef(currentBranch.name);
    curBranchMetadataRef.rename(newName);

    // Update any references to the branch.
    allBranches.forEach((branch) => {
      if (branch.getMeta()?.parentBranchName === oldName) {
        branch.setParentBranchName(newName);
      }
    });

    logInfo(`Successfully renamed (${oldName}) to (${chalk.green(newName)})`);
  });
};
