import type { CollectionEntry } from 'astro:content';

/**
 * Filter out draft posts in production
 * In dev mode, all posts are visible
 */
export function filterDrafts(posts: CollectionEntry<'blog'>[]): CollectionEntry<'blog'>[] {
	const isDev = import.meta.env.DEV;

	if (isDev) {
		return posts;
	}

	return posts.filter(post => !post.data.draft);
}
