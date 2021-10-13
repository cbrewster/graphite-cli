import yargs from "yargs";
declare const args: {
    readonly all: {
        readonly describe: "Stage all changes before committing.";
        readonly demandOption: false;
        readonly default: false;
        readonly type: "boolean";
        readonly alias: "a";
    };
    readonly message: {
        readonly type: "string";
        readonly alias: "m";
        readonly describe: "The updated message for the commit.";
        readonly demandOption: false;
    };
    readonly edit: {
        readonly type: "boolean";
        readonly describe: "Modify the existing commit message.";
        readonly demandOption: false;
        readonly default: true;
    };
};
declare type argsT = yargs.Arguments<yargs.InferredOptionTypes<typeof args>>;
export declare const command = "amend";
export declare const canonical = "commit amend";
export declare const aliases: string[];
export declare const description = "Amend the most recent commit and fix upstack branches.";
export declare const builder: {
    readonly all: {
        readonly describe: "Stage all changes before committing.";
        readonly demandOption: false;
        readonly default: false;
        readonly type: "boolean";
        readonly alias: "a";
    };
    readonly message: {
        readonly type: "string";
        readonly alias: "m";
        readonly describe: "The updated message for the commit.";
        readonly demandOption: false;
    };
    readonly edit: {
        readonly type: "boolean";
        readonly describe: "Modify the existing commit message.";
        readonly demandOption: false;
        readonly default: true;
    };
};
export declare const handler: (argv: argsT) => Promise<void>;
export {};
