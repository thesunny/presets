import * as utils from "@thesunny/script-utils";

/**
 * type with undefined because we're not sure how many args were passed in
 */
const presetName: string | undefined = process.argv[2];

utils.title(`Executing Preset ${JSON.stringify(presetName)}`);

const { default: task } = require(`../presets/${presetName}`) as {
  default: () => void;
};

task();
