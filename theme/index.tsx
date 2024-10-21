import Theme from 'rspress/theme';

import ZenMode from '../components/ZenMode.tsx';

// 传入插槽
const Layout = () => <Theme.Layout afterNavMenu={<ZenMode />} />;

export default {
	...Theme,
	Layout
};

// 重导出其他部分
export * from 'rspress/theme';
