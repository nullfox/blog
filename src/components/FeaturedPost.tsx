import { ReactNode } from 'react';

import {
  Box,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

import NextLink from 'next/link';

import { Post } from '../services/content';
import Tag from './Tag';

interface FeaturedPostProps {
  post: Post;
  children?: ReactNode;
  linkTitle?: boolean;
}

const FeaturedPost = ({
  post,
  children,
  linkTitle = true,
}: FeaturedPostProps) => (
  <Flex w="full" alignItems="center" boxShadow="lg">
    <Flex w="45%">
      <VStack pr="15%" justifyContent="flex-start" spacing={6}>
        <HStack w="full">
          {post.meta.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </HStack>

        {linkTitle && (
          <NextLink href={`/${post.slug}`} passHref>
            <Link>
              <Heading
                as="h3"
                fontWeight="800"
                lineHeight="base"
                transition="all 0.3s"
              >
                {post.meta.title}
              </Heading>
            </Link>
          </NextLink>
        )}

        {!linkTitle && (
          <Heading
            as="h3"
            fontWeight="800"
            lineHeight="base"
            transition="all 0.3s"
          >
            {post.meta.title}
          </Heading>
        )}

        <Text>{post.meta.description}</Text>

        {children}
      </VStack>
    </Flex>

    <Box w="55%" h="100%" overflow="hidden" borderRadius={6}>
      <NextLink href={`/${post.slug}`} passHref>
        <Link>
          <Image objectFit="cover" className="zoom" src={post.meta.image} />
        </Link>
      </NextLink>
    </Box>
  </Flex>
);

export default FeaturedPost;
