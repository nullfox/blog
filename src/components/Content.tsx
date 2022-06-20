import { Box, Flex, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Post } from '../services/content';
import { FeaturedPost, Topics } from './SidebarBox';

interface ContentProps {
  children: ReactNode;
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Content = ({ children, featuredPost, tagCounts }: ContentProps) => (
  <Flex w="full" py={16} justifyContent="space-between">
    <Box w="70%">{children}</Box>
    <Box w="27.5%">
      <VStack w="full" alignItems="flex-start" spacing={8}>
        <FeaturedPost post={featuredPost} />
        <Topics tagCounts={tagCounts} />
      </VStack>
    </Box>
  </Flex>
);

export default Content;
