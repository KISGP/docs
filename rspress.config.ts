import { join } from 'path';
import { defineConfig } from 'rspress/config';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';

import katex from 'rspress-plugin-katex';
import supersub from 'rspress-plugin-supersub';

import getDirStructure from './getDirStructure.ts';

export default defineConfig({
	// 部署基础路径
	// base: '/docs/',
	// 文档根目录
	root: 'docs',
	route: {
		include: ['docs/**/*.md']
	},
	// 图片放大
	mediumZoom: {
		selector: '.rspress-doc img'
	},
	themeConfig: {
		outlineTitle: '目录',
		lastUpdated: true,
		enableScrollToTop: true,
		enableContentAnimation: true,
		enableAppearanceAnimation: true,
		sidebar: {
			'/': [
				{
					text: 'Docs',
					link: 'index'
				},
				...getDirStructure(join(__dirname, 'docs'), '')
			]
		}
	},
	plugins: [
		// 使用 Open Sans 字体
		pluginFontOpenSans(),
		// 使用 KaTeX 渲染数学公式
		katex({
			strict: false
		}),
		// 支持上标与下标语法。
		supersub()
	]
});
