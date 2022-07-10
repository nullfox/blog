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

import Tag from './Tag';
import ZoomImage from './ZoomImage';

interface FeaturedPostProps {
  post: RawPost | Post;
  children?: ReactNode;
  linkTitle?: boolean;
}

const FeaturedPost = ({
  post,
  children,
  linkTitle = true,
}: FeaturedPostProps) => (
  <Flex w="full" flexWrap="wrap" alignItems="center" boxShadow="lg">
    <Flex
      w={{ base: 'full', lg: '45%' }}
      mt={{ base: 6, lg: 0 }}
      order={{ base: 1, lg: 0 }}
    >
      <VStack
        pr={{ base: 0, lg: '15%' }}
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={6}
      >
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
                fontSize={{ base: 'xl', lg: '3xl' }}
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
            fontSize={{ base: 'xl', lg: '3xl' }}
            fontWeight="800"
            lineHeight="base"
            transition="all 0.3s"
          >
            {post.meta.title}
          </Heading>
        )}

        <Text fontSize={{ base: 'sm', lg: 'md ' }}>{post.meta.excerpt}</Text>

        {children}
      </VStack>
    </Flex>

    <ZoomImage
      href={`/${post.slug}`}
      image={post.meta.image}
      w={{ base: 'full', lg: '55%' }}
      order={{ base: 0, lg: 1 }}
    />
  </Flex>
);

export default FeaturedPost;
