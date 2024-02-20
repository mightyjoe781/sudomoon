import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import rehypePresetMinify from 'rehype-preset-minify';
import react from '@astrojs/react'


const rehypeExternalLinksConfig = [
	rehypeExternalLinks,
	{ target:  '_blank', rel: ['noopener', 'noreferrer']}
]

// https://astro.build/config
export default defineConfig({
	site: 'https://sudhanshu.dev',
	trailingSlash: 'never',
	output: 'server',
	integrations: [mdx({
		rehypePlugins: [rehypeExternalLinksConfig, rehypePresetMinify]
	}), 
	react(),
	sitemap({
		filter: (page) => !page.includes('--delist')
	})],
	markdown: {
		smartypants: true,
		rehypePlugins: [rehypeExternalLinksConfig],
		shikiConfig: {
			theme: 'one-dark-pro'
		}
	}
});
