import { ReactNode } from 'react';

import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';

import { sluggify } from '@nullfox/nextjs-blog';
import NextLink from 'next/link';

import ZoomImage from './ZoomImage';

interface SidebarBoxProps {
  children: ReactNode;
  title: string;
}

const SidebarBox = ({ title, children }: SidebarBoxProps) => (
  <Box
    w="full"
    borderRadius={6}
    bg="themeGray.100"
    borderWidth={1}
    borderColor="border"
    px={4}
    pt={6}
    pb={4}
  >
    <Center borderBottomWidth={1} borderBottomColor="border" pb={2} mb={2}>
      <Text color="themeGray.700" fontWeight="700" fontSize="xl">
        {title}
      </Text>
    </Center>

    <Box>{children}</Box>
  </Box>
);

interface FeaturedPostProps {
  post: RawPost;
}

export const FeaturedPost = ({ post }: FeaturedPostProps) => (
  <SidebarBox title="Featured Post">
    <Flex justifyContent="space-between" pt={2}>
      <ZoomImage
        aspect={1}
        w="25%"
        href={`/${post.slug}`}
        image={post.meta.image}
      />

      <Box w="70%">
        <NextLink href={`/${post.slug}`} passHref>
          <Link>
            <Heading
              as="h5"
              fontSize="sm"
              fontWeight="400"
              lineHeight="base"
              transition="all 0.1s"
            >
              {post.meta.title}
            </Heading>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  </SidebarBox>
);

interface TopicsProps {
  tagCounts: Record<string, number>;
}

export const Topics = ({ tagCounts }: TopicsProps) => (
  <SidebarBox title="Explore Topics">
    {Object.keys(tagCounts)
      .sort((a, b) => (tagCounts[a] > tagCounts[b] ? -1 : 1))
      .map((tag, idx) => (
        <NextLink key={tag} href={`/tag/${sluggify(tag)}`} passHref>
          <Link>
            <Flex
              justifyContent="space-between"
              borderTopWidth={idx === 0 ? 0 : 1}
              borderTopColor="border"
              py={2}
              color="themeGray.700"
              _hover={{
                color: 'primary',
              }}
            >
              <Text fontWeight="600">{tag}</Text>
              <Text fontWeight="600">{tagCounts[tag]}</Text>
            </Flex>
          </Link>
        </NextLink>
      ))}
  </SidebarBox>
);

export default SidebarBox;
