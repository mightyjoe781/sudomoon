import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		tech: z.array(z.string()),
		category: z.enum(['open-source', 'web', 'systems', 'game-dev', 'ai']),
		links: z.array(z.object({ label: z.string(), url: z.string() })),
		featured: z.boolean().default(false),
		priority: z.number(),
		date: z.string(),
	}),
});

export const collections = { blog, projects };
