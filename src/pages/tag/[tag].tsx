import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { NextSeo } from 'next-seo';

import CollectionPost from '../../components/CollectionPost';
import Content from '../../components/Content';
import Primary from '../../layouts/Primary';
import {
  Post,
  getDefaultStaticProps,
  getTagPaths,
} from '../../services/content';
import { slug } from '../../services/text';

interface TagProps {
  tag: string;
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Tag = ({ tag, posts, featuredPost, tagCounts }: TagProps) => {
  if (!tag) {
    return null;
  }

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
      <NextSeo
        title={`${tag} Posts`}
        description={`Posts tagged ${tag}`}
        openGraph={{
          url: `https://www.nullfox.com/tag/${tag}`,
          title: `${tag} Posts`,
          description: `Posts tagged ${tag}`,
        }}
      />

      <Flex
        w="full"
        justifyContent="flex-start"
        pt={8}
        px={{ base: '5%', lg: 0 }}
      >
        <Heading fontWeight="800" fontSize="3xl">
          Posts tagged{' '}
          <Text as="span" color="themeGray.500">
            "{tag}"
          </Text>
        </Heading>
      </Flex>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <SimpleGrid minChildWidth="400px" spacingX="5%" spacingY={16}>
          {(posts || []).map((item) => (
            <CollectionPost key={item.slug} post={item} />
          ))}
        </SimpleGrid>
      </Content>
    </Primary>
  );
};

export async function getStaticPaths() {
  const tagPaths = await getTagPaths();

  return {
    paths: tagPaths.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { tag } }) {
  const props = await getDefaultStaticProps();

  return {
    props: {
      tag,
      ...props,
      posts: props.posts.filter((post) =>
        post.meta.tags.map((t) => slug(t)).includes(tag),
      ),
    },
  };
}

export default Tag;
