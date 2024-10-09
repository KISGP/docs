import { unistVisit, type RemarkPluginFactory } from 'rspress-plugin-devkit';

export interface RemarkParseMarkScriptOptions {
	/**
	 * The syntax for markscript.
	 *
	 * @example
	 *
	 * ```markdown
	 * ==x==
	 * ```
	 *
	 * Will be converted to:
	 *
	 * `<span>x</span>`
	 *
	 * @default '=='
	 */
	markSyntax?: string;
}

export const remarkParseMarkScript: RemarkPluginFactory<RemarkParseMarkScriptOptions> = options => {
	const { markSyntax = '==' } = options ?? {};

	const markSyntaxRegex = new RegExp(`\\${markSyntax}`);

	const syntaxReplacers = [
		{
			regex: markSyntaxRegex,
			type: 'markscript',
			tagName: 'mark'
		}
	];

	return (tree, vfile) => {
		unistVisit(tree, 'text', (node, i, parent) => {
			const { value } = node;

			syntaxReplacers.forEach(({ regex, type, tagName }) => {
				const values = value.split(regex);

				if (values.length === 1 || values.length % 2 === 0) {
					return;
				}

				const children = values.map((str, i) =>
					i % 2 === 0
						? {
								type: 'text',
								value: str
						  }
						: {
								type,
								data: {
									hName: tagName
								},
								children: [
									{
										type: 'text',
										value: str
									}
								]
						  }
				);

				// @ts-expect-error
				parent!.children.splice(i!, 1, ...children);
			});
		});
	};
};
