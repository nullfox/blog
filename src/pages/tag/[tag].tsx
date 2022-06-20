import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { NextSeo } from 'next-seo';
import { join } from 'path';

import CollectionPost from '../../components/CollectionPost';
import Content from '../../components/Content';
import Primary from '../../layouts/Primary';
import {
  Post,
  getPosts,
  getTagCounts,
  getTagPaths,
  getFeaturedPost,
} from '../../services/content';
import { slug } from '../../services/text';

const CONTENT_ROOT = join(process.cwd(), 'content');

interface TagProps {
  tag: string;
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Tag = ({ tag, posts, featuredPost, tagCounts }: TagProps) => {
  return (
    <Primary posts={posts} tags={Object.keys(tagCounts)}>
      <NextSeo
        title={`${tag} Posts`}
        description={`Posts tagged ${tag}`}
        openGraph={{
          url: `https://nullfox.com/tag/${tag}`,
          title: `${tag} Posts`,
          description: `Posts tagged ${tag}`,
        }}
      />

      <Flex w="full" justifyContent="flex-start" pt={8}>
        <Heading fontWeight="800" fontSize="3xl">
          Posts tagged{' '}
          <Text as="span" color="themeGray.500">
            "{tag}"
          </Text>
        </Heading>
      </Flex>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <SimpleGrid columns={2} spacingX="5%" spacingY={16}>
          {posts.map((item) => (
            <CollectionPost key={item.slug} post={item} />
          ))}
        </SimpleGrid>
      </Content>
    </Primary>
  );
};

export async function getStaticPaths() {
  const tagPaths = await getTagPaths(CONTENT_ROOT);

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
  const posts = await getPosts(CONTENT_ROOT);
  const tagCounts = await getTagCounts(CONTENT_ROOT);
  const featuredPost = await getFeaturedPost(CONTENT_ROOT);

  return {
    props: {
      tag,
      posts: posts.filter((post) =>
        post.meta.tags.map((t) => slug(t)).includes(tag),
      ),
      featuredPost,
      tagCounts,
    },
    revalidate: 1,
  };
}

export default Tag;
