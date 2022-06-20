import { Box, SimpleGrid } from '@chakra-ui/react';

import { ArticleJsonLd, NextSeo } from 'next-seo';

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
      <NextSeo
        title="Ben Fox's Blog"
        description="Ben Fox blogging about TypeScript, open source, web application development and the cloud."
        openGraph={{
          url: 'https://www.nullfox.com',
          title: "Ben Fox's Blog",
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
        datePublished={latest.meta.date.toISOString()}
        dateModified={latest.meta.date.toISOString()}
        authorName="Ben Fox"
        description="Ben Fox blogging about TypeScript, open source, web application development and the cloud."
      />

      <Box w="full" pt={{ base: 6, lg: 16 }} px={{ base: '5%', lg: 0 }}>
        <FeaturedPost post={latest} />
      </Box>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <SimpleGrid minChildWidth="400px" spacingX="5%" spacingY={46}>
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
