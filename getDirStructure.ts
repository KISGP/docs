import fs from 'fs';
import path from 'path';

export default function getDirStructure(dirPath: string, relativePath: string) {
	const result: any[] = [];
	const items = fs.readdirSync(dirPath);

	for (const item of items) {
		const fullPath = path.join(dirPath, item);
		const stat = fs.statSync(fullPath);

		if (item === 'assets' || item === 'public') continue;

		if (stat.isDirectory()) {
			result.push({
				text: item,
				collapsed: true,
				items: getDirStructure(fullPath, path.join(relativePath, item))
			});
		} else if (item.includes('.md') && item !== 'index.md') {
			const index = parseInt(item.split('_')[0]);
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
