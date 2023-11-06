import { Plugin } from 'rollup';
import { createFilter } from '@rollup/pluginutils';

import { obfuscate, ObfuscationResult, ObfuscatorOptions } from 'javascript-obfuscator';

type FilterOptions = string | RegExp | (string | RegExp)[];

export interface RollupPluginObfuscatorOptions {
  /**
   * javascript-obfuscator options. Refer to documentation here https://github.com/javascript-obfuscator/javascript-obfuscator#javascript-obfuscator-options
   * @default {}
   */
  options: ObfuscatorOptions,
  /**
   * Files to include when applying per-file obfuscation.
   * @default [/\.vue$/, /\.[jt]sx$/,/\.[jt]s$/]
   */
  include: FilterOptions,
  /**
   * Files to exclude when applying per-file obfuscation. The priority is higher than `include`.
   * @default ['node_modules/**']
   */
  exclude: FilterOptions,
  /**
   * Overwrite the obfuscate method used.
   */
  obfuscate: (sourceCode: string, inputOptions?: ObfuscatorOptions) => ObfuscationResult,
}

const defaultOptions = {
  options: {},
  include: [/\.vue$/, /\.[jt]sx$/,/\.[jt]s$/],
  exclude: ['node_modules/**'],
  obfuscate,
};
function rollupPluginObfuscator(override?: Partial<RollupPluginObfuscatorOptions>): Plugin {
  const options: RollupPluginObfuscatorOptions = {
    ...defaultOptions,
    ...override,
  };
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'rollup-plugin-code-obfuscator',
    transform: (code:string, id:string) => {
      if (!filter(id)) return null;
      const obfuscationResult = options.obfuscate(code, {
        ...options.options,
        inputFileName: id,
        sourceMap: true,
      });

      return {
        code: obfuscationResult.getObfuscatedCode(),
        map: obfuscationResult.getSourceMap(),
      };
    }
  };
}

export default rollupPluginObfuscator;
module.exports = rollupPluginObfuscator;