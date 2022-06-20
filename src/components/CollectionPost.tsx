import { Box, HStack, Heading, Image, Link, Text } from '@chakra-ui/react';

import NextLink from 'next/link';

import { Post } from '../services/content';
import Tag from './Tag';
import ZoomImage from './ZoomImage';

interface CollectionPostProps {
  post: Post;
}

const CollectionPost = ({ post }: CollectionPostProps) => (
  <Box w="full">
    <ZoomImage h="unset" image={post.meta.image} href={`/${post.slug}`} />
    <HStack w="full" my={4}>
      {post.meta.tags.map((tag, idx) => (
        <Tag key={tag} tag={tag} />
      ))}
    </HStack>
    <NextLink href={`/${post.slug}`} passHref>
      <Link>
        <Heading
          as="h4"
          fontSize="xl"
          fontWeight="800"
          lineHeight="base"
          transition="all 0.1s"
        >
          {post.meta.title}
        </Heading>
      </Link>
    </NextLink>
  </Box>
);

export default CollectionPost;
