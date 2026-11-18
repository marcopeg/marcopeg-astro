import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { plainDescription } from '../utils/description';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { filterDrafts, getSlugFromId } from '../utils/posts';

export async function GET(context) {
	const posts = filterDrafts(await getCollection('posts'));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			description: plainDescription(post.data.description),
			link: `/${getSlugFromId(post.id)}/`,
		})),
	});
}
