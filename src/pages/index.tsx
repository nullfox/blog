import { Box, SimpleGrid } from '@chakra-ui/react';

import { join } from 'path';

import CollectionPost from '../components/CollectionPost';
import Content from '../components/Content';
import FeaturedPost from '../components/FeaturedPost';
import Primary from '../layouts/Primary';
import {
  Post,
  generateRssFeeds,
  getPosts,
  getTagCounts,
  getFeaturedPost,
} from '../services/content';

const CONTENT_ROOT = join(process.cwd(), 'content');

interface IndexProps {
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Index = ({ posts, featuredPost, tagCounts }: IndexProps) => {
  const latest = posts[0];
  const rest = posts.slice(1);

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts)}>
      <Box w="full" pt={16}>
        <FeaturedPost post={latest} />
      </Box>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <SimpleGrid columns={2} spacingX="5%" spacingY={16}>
          {rest.map((item) => (
            <CollectionPost key={item.slug} post={item} />
          ))}
        </SimpleGrid>
      </Content>
    </Primary>
  );
};

export async function getStaticProps() {
  await generateRssFeeds(CONTENT_ROOT);

  const posts = await getPosts(CONTENT_ROOT);
  const tagCounts = await getTagCounts(CONTENT_ROOT);
  const featuredPost = await getFeaturedPost(CONTENT_ROOT);

  return {
    props: {
      posts,
      featuredPost,
      tagCounts,
    },
    revalidate: 1,
  };
}

export default Index;
