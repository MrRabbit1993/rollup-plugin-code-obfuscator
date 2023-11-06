# rollup-plugin-code-obfuscator



```sh
pnpm add --dev rollup-plugin-code-obfuscator javascript-obfuscator
```

## Features

1. javascript-obfuscator is installed separately from the rollup plugin, so it will always be updatable (unlike the official rollup plugin which has been outdated for years!)
2. You can decide if you prefer to apply obfuscation:
	- the traditional way, to the whole bundle
	- to each file separately, avoiding obfuscating your open-source dependencies, which results in a **huge performance boost**

## Usage

```js
import obfuscator from 'rollup-plugin-code-obfuscator';

export default {
	input: 'src/main.js',
	plugins: [
		obfuscator({
			options: {
				// Your javascript-obfuscator options here
				// See what's allowed: https://github.com/javascript-obfuscator/javascript-obfuscator
			},
		}),
	]
}
```

## Options

### `options`

Type: `Object`<br/>
Default: `{}`

Options that will be passed to javascript-obfuscator.
See allowed options [here](https://github.com/javascript-obfuscator/javascript-obfuscator).

### `include`

Type: `String | RegExp | Array[...String|RegExp]`<br/>
Default: `[/\.vue$/, /\.[jt]sx$/,/\.[jt]s$/]`


### `exclude`

Type: `String | RegExp | Array[...String|RegExp]`<br/>
Default: `['node_modules/**']`


### `obfuscator`

Type: `JavascriptObfuscator`<br/>
Default: `require('javascript-obfuscator')`

This plugin uses the version of `javascript-obfuscator` you installed alongside with it, but you are free to override it (for example, if you want to use a fork).
