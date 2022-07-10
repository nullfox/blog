import { ReactNode } from 'react';

import { Box, Flex, VStack } from '@chakra-ui/react';

import { FeaturedPost, Topics } from './SidebarBox';

interface ContentProps {
  children: ReactNode;
  featuredPost: Post;
  tagCounts: Record<string, number>;
  sidebarBeforeChildren?: ReactNode;
  sidebarAfterChildren?: ReactNode;
}

const Content = ({
  children,
  featuredPost,
  tagCounts,
  sidebarBeforeChildren,
  sidebarAfterChildren,
}: ContentProps) => (
  <Flex flexWrap="wrap" w="full" py={16} justifyContent="space-between">
    <Box w={{ base: 'full', lg: '70%' }} px={{ base: '5%', lg: 0 }} order={0}>
      {children}
    </Box>
    <Box
      w={{ base: 'full', lg: '27.5%' }}
      px={{ base: '5%', lg: 0 }}
      mt={{ base: 10, lg: 0 }}
      order={1}
    >
      <VStack w="full" alignItems="flex-start" spacing={8}>
        {sidebarBeforeChildren}
        <FeaturedPost post={featuredPost} />
        <Topics tagCounts={tagCounts} />
        {sidebarAfterChildren}
      </VStack>
    </Box>
  </Flex>
);

export default Content;
