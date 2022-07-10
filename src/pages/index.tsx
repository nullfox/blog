import { Box, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { FiFrown } from 'react-icons/fi';

import { PageSeo } from '@nullfox/nextjs-blog';
import {
  generateRssFeeds,
  generateSitemap,
  getAllContent,
} from '@nullfox/nextjs-blog/content';
import { useRouter } from 'next/router';

import CollectionPost from '../components/CollectionPost';
import Content from '../components/Content';
import FeaturedPost from '../components/FeaturedPost';
import Primary from '../layouts/Primary';

const Index = ({ posts, featuredPosts, tagCounts }: PageProps) => {
  const { query } = useRouter();

  const filtered = query.unpublished
    ? posts
    : posts.filter((post) => !!post.meta.published);

  const latest = filtered[0];
  const rest = filtered.slice(1);

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
      <PageSeo modifiedAt={new Date(latest.meta.date)} />

      <Box w="full" pt={{ base: 6, lg: 16 }} px={{ base: '5%', lg: 0 }}>
        <FeaturedPost post={latest} />
      </Box>

      <Content tagCounts={tagCounts} featuredPost={featuredPosts[0]}>
        {rest.length > 0 && (
          <SimpleGrid minChildWidth="400px" spacingX="5%" spacingY={46}>
            {rest.map((item) => (
              <CollectionPost key={item.slug} post={item} />
            ))}
          </SimpleGrid>
        )}

        {rest.length === 0 && (
          <VStack pt={10}>
            <Icon as={FiFrown} boxSize={16} color="rgba(255, 255, 255, 0.8)" />
            <Text fontSize="2xl" color="rgba(255, 255, 255, 0.8)">
              No more posts!
            </Text>
          </VStack>
        )}
      </Content>
    </Primary>
  );
};

export async function getStaticProps() {
  await generateRssFeeds();
  await generateSitemap();

  const props = await getAllContent();

  return {
    props,
  };
}

export default Index;
