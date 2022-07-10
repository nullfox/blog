type RawPost = import('@nullfox/nextjs-blog').RawPost;
type Post = import('@nullfox/nextjs-blog').Post;
type Author = import('@nullfox/nextjs-blog').Author;

type SearchPost = RawPost['meta'] & {
  slug: string;
};

interface PageProps {
  author: Author;
  searchPosts: SearchPost[];
  featuredPosts: RawPost[];
  tagCounts: Record<string, number>;
}
