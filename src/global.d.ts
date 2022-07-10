type Post = import('@nullfox/nextjs-blog').Post;

interface PageProps {
  posts: Post[];
  featuredPosts: Post[];
  tagCounts: Record<string, number>;
}
