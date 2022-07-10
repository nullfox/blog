import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';

import { PageSeo } from '@nullfox/nextjs-blog';
import { getAllContent, getTagStaticPaths } from '@nullfox/nextjs-blog/content';
import { GetStaticPaths, GetStaticProps } from 'next';

import CollectionPost from '../../components/CollectionPost';
import Content from '../../components/Content';
import Primary from '../../layouts/Primary';

interface TagProps extends PageProps {
  posts: RawPost[];
  tag: string;
}

const Tag = ({
  tag,
  posts,
  searchPosts,
  featuredPosts,
  tagCounts,
  author,
}: TagProps) => {
  if (!tag) {
    return null;
  }

  return (
    <Primary posts={searchPosts} tags={Object.keys(tagCounts || {})}>
      <PageSeo title={`${tag} Posts`} description={`Posts tagged ${tag}`} />

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

      <Content
        tagCounts={tagCounts}
        featuredPost={featuredPosts[0]}
        author={author}
      >
        <SimpleGrid minChildWidth="400px" spacingX="5%" spacingY={16}>
          {(posts || []).map((item) => (
            <CollectionPost key={item.slug} post={item} />
          ))}
        </SimpleGrid>
      </Content>
    </Primary>
  );
};

export const getStaticPaths: GetStaticPaths = getTagStaticPaths;
export const getStaticProps: GetStaticProps<TagProps> = async ({
  params: { tag },
}) => {
  const actualTag = [].concat(tag).shift();

  const { posts, tagCounts, author, featuredPosts } = await getAllContent({
    tag: actualTag,
  });

  return {
    props: {
      tag: actualTag,
      posts,
      tagCounts,
      author,
      featuredPosts,
      searchPosts: posts.map((post) => ({
        ...post.meta,
        slug: post.slug,
      })),
    },
  };
};

export default Tag;
