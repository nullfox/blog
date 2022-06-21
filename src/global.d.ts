type Post = import('./services/').Post;

interface PageProps {
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}
