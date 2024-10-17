import { join } from 'path';
import { readdirSync, statSync } from 'fs';
import { defineConfig } from 'rspress/config';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';

import katex from 'rspress-plugin-katex';
import supersub from 'rspress-plugin-supersub';
import ga from 'rspress-plugin-google-analytics';
import readingTime from 'rspress-plugin-reading-time';
import mark from './plugin/rspress-plugin-mark';

export default defineConfig({
	title: 'KIS Docs',
	description: '笔记',
	icon: '/favicon.ico',
	logo: '/favicon.png',
	logoText: 'KIS Docs',
	// 文档根目录
	root: 'docs',
	route: {
		include: ['docs/**/*.md']
	},
	globalStyles: join(__dirname, 'global.css'),
	themeConfig: {
		outlineTitle: '目录',
		lastUpdated: true,
		enableScrollToTop: true,
		enableContentAnimation: true,
		enableAppearanceAnimation: true,
		sidebar: {
			'/': [
				{
					text: '首页',
					link: 'index'
				},
				...getDirStructure(join(__dirname, 'docs'), '')
			]
		},
		socialLinks: [
			{
				icon: 'github',
				mode: 'link',
				content: 'https://github.com/KISGP'
			}
		]
	},
	plugins: [
		// 使用 Open Sans 字体
		pluginFontOpenSans(),
		// 使用 KaTeX 渲染数学公式
		katex({
			strict: false
		}),
		// 支持上标与下标语法。
		supersub(),
		// 计算预估阅读时间的函数
		readingTime({
			defaultLocale: 'zh-CN'
		}),
		// 高亮标记
		mark(),
		// Google Analytics
		ga({
			id: 'G-6YNKEKDNQS'
		})
	]
});

function getDirStructure(dirPath: string, relativePath: string) {
	const result: any[] = [];
	const items = readdirSync(dirPath);

	for (const item of items) {
		const fullPath = join(dirPath, item);
		const stat = statSync(fullPath);

		if (item === 'assets' || item === 'public') continue;

		const index = parseInt(item.split('_')[0]);
		if (stat.isDirectory()) {
			if (index) {
				result[index] = {
					text: item.split('_')[1],
					collapsed: true,
					items: getDirStructure(fullPath, join(relativePath, item))
				};
			} else {
				result.push({
					text: item,
					collapsed: true,
					items: getDirStructure(fullPath, join(relativePath, item))
				});
			}
		} else if (item.includes('.md') && item !== 'index.md') {
			const link = `${relativePath}/${item}`.replace(/\\/g, '/').replace('.md', '');
			if (index) {
				result[index] = link;
			} else {
				result.push(link);
			}
		}
	}

	return result.filter(item => Boolean(item));
}
