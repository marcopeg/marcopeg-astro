import type { CollectionEntry } from 'astro:content';

/**
 * Filter out draft posts in production
 * In dev mode, all posts are visible
 */
export function filterDrafts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
	const isDev = import.meta.env.DEV;

	if (isDev) {
		return posts;
	}

	return posts.filter(post => !post.data.draft);
}

/**
 * Calculate reading time based on content
 * Assumes average reading speed of 200 words per minute
 */
export function getReadingTime(content: string | undefined): string {
	if (!content) {
		return '1 min read';
	}
	const wordsPerMinute = 200;
	const words = content.trim().split(/\s+/).length;
	const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
	return `${minutes} min read`;
}
