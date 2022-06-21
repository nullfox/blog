type Post = import('./services/content').Post;

interface PageProps {
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}
