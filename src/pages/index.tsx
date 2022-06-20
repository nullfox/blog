import { Box, SimpleGrid } from '@chakra-ui/react';

import CollectionPost from '../components/CollectionPost';
import Content from '../components/Content';
import FeaturedPost from '../components/FeaturedPost';
import Primary from '../layouts/Primary';
import { Post, getDefaultStaticProps } from '../services/content';

interface IndexProps {
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Index = ({ posts, featuredPost, tagCounts }: IndexProps) => {
  const latest = posts[0];
  const rest = posts.slice(1);

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
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
  const props = await getDefaultStaticProps();

  return {
    props,
  };
}

export default Index;
