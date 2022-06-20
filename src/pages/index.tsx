import { Box, Icon, SimpleGrid, Text, VStack } from '@chakra-ui/react';

import { FiFrown } from 'react-icons/fi';

import { ArticleJsonLd, NextSeo } from 'next-seo';

import CollectionPost from '../components/CollectionPost';
import Content from '../components/Content';
import FeaturedPost from '../components/FeaturedPost';
import Primary from '../layouts/Primary';
import {
  Post,
  generateRssFeeds,
  getDefaultStaticProps,
} from '../services/content';

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
      <NextSeo
        title="Javascript Consultant, TypeScript Consultant, Web Application Developer"
        description="Ben Fox blogging about TypeScript, open source, web application development and the cloud."
        openGraph={{
          url: 'https://www.nullfox.com',
          title:
            'Javascript Consultant, TypeScript Consultant, Web Application Developer',
          description:
            'Ben Fox blogging about TypeScript, open source, web application development and the cloud.',
          images: [{ url: 'https://www.nullfox.com/images/logo.png' }],
        }}
      />

      <ArticleJsonLd
        type="Blog"
        url="https://www.nullfox.com"
        title="Ben Fox's Blog"
        images={['https://www.nullfox.com/images/logo.png']}
        datePublished={latest.meta.date}
        dateModified={latest.meta.date}
        authorName="Ben Fox"
        description="Ben Fox blogging about TypeScript, open source, web application development and the cloud."
      />

      <Box w="full" pt={{ base: 6, lg: 16 }} px={{ base: '5%', lg: 0 }}>
        <FeaturedPost post={latest} />
      </Box>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
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

  const props = await getDefaultStaticProps();

  return {
    props,
  };
}

export default Index;
