import { Feed } from 'feed';
import frontMatter from 'front-matter';
import { mkdir, readFile, readdir, writeFile } from 'fs/promises';
import { join } from 'path';
import readingTime from 'reading-time';

import { slug } from './text';

interface RawMeta {
  title: string;
  description: string;
  tags: string[];
  image: string;
  date: Date;
  readingTime: number;
  featured?: boolean;
}

export interface Meta extends Omit<RawMeta, 'date'> {
  date: string;
}

export interface Post {
  slug: string;
  meta: RawMeta;
  content: string;
}

const root = join(process.cwd(), 'content'); // '../../content';
const extension = '.md';

const getPostFiles = async () => {
  const files = await readdir(root);

  return files.filter((file) => file.endsWith(extension));
};

export const getPostPaths = async () => {
  const files = await getPostFiles();

  return files.map((file) => file.replace(extension, ''));
};

export const getPost = async (slug: string): Promise<Post> => {
  const files = await getPostFiles();

  const file = files.find((path) => path === `${slug}${extension}`);

  const data = await readFile(join(root, file));

  const text = data.toString();

  const mattered = frontMatter<RawMeta>(text);

  return {
    slug,
    meta: mattered.attributes,
    content: mattered.body,
  };
};

export const getPosts = async () => {
  const slugs = await getPostPaths();

  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));

  return posts
    .slice()
    .sort((a, b) => a.meta.date.valueOf() - b.meta.date.valueOf())
    .map((post) => ({
      ...post,
      meta: {
        ...post.meta,
        readingTime: Math.round(readingTime(post.content).minutes),
        date: post.meta.date.toISOString(),
      },
    }));
};

export const getFeaturedPost = async () => {
  const posts = await getPosts();

  const featured = posts.find((p) => p.meta.featured);

  if (featured) {
    return featured;
  }

  return posts[0];
};

export const getTagPaths = async () => {
  const posts = await getPosts();

  const tags = new Set<string>();

  posts.forEach((post) => {
    post.meta.tags.forEach((tag) => {
      tags.add(slug(tag));
    });
  });

  return Array.from(tags);
};

export const getTagCounts = async () => {
  const posts = await getPosts();

  const counts = new Map<string, number>();

  posts.forEach((post) => {
    post.meta.tags.forEach((tag) => {
      counts.set(tag, counts.has(tag) ? counts.get(tag) + 1 : 1);
    });
  });

  return Object.fromEntries(counts);
};

export const getDefaultStaticProps = async () => {
  const [posts, featuredPost, tagCounts] = await Promise.all([
    getPosts(),
    getFeaturedPost(),
    getTagCounts(),
  ]);

  return {
    posts,
    featuredPost,
    tagCounts,
  };
};

export const generateRssFeeds = async () => {
  const posts = await getPosts();
  const siteURL = process.env.SITE_URL;
  const date = new Date();

  const author = {
    name: 'Ben Fox',
    email: 'social@nullfox.com',
    link: 'https://linkedin.com/in/nullfox',
  };

  const feed = new Feed({
    title: "Ben Fox's Blog",
    description: '',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/logo.svg`,
    favicon: `${siteURL}/favicon.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Ben Fox`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`,
      json: `${siteURL}/rss/feed.json`,
      atom: `${siteURL}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug}`;

    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.description,
      content: post.meta.description,
      author: [author],
      contributor: [author],
      date: new Date(post.meta.date),
    });
  });

  const rssDirectory = join(process.cwd(), 'public', 'rss');

  await mkdir(rssDirectory, { recursive: true });

  await Promise.all([
    writeFile(join(rssDirectory, 'feed.xml'), feed.rss2()),
    writeFile(join(rssDirectory, 'atom.xml'), feed.atom1()),
    writeFile(join(rssDirectory, 'feed.json'), feed.json1()),
  ]);
};
