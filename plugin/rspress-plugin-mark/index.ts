import path from 'path';
import { PresetConfigMutator } from 'rspress-plugin-devkit';
import { remarkParseMarkScript, type RemarkParseMarkScriptOptions } from './remark-plugins.ts';

import type { RspressPlugin } from '@rspress/shared';

export interface RspressPluginSupersubOptions extends RemarkParseMarkScriptOptions {}

export default function rspressPluginMark(options: RemarkParseMarkScriptOptions = {}): RspressPlugin {
	return {
		name: 'rspress-plugin-mark',
		config(config) {
			return new PresetConfigMutator(config).disableMdxRs().toConfig();
		},
		markdown: {
			remarkPlugins: [[remarkParseMarkScript, <RemarkParseMarkScriptOptions>options]]
		},
		globalStyles: path.posix.join(__dirname, './mark.css')
	};
}
