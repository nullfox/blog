type Post = import('@nullfox/nextjs-blog').Post;
type Author = import('@nullfox/nextjs-blog').Author;

interface PageProps {
  author: Author;
  posts: Post[];
  featuredPosts: Post[];
  tagCounts: Record<string, number>;
}
