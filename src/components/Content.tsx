import { ReactNode } from 'react';

import { Box, Flex, HStack, VStack } from '@chakra-ui/react';

import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import SidebarBox, { FeaturedPost, Topics } from './SidebarBox';
import SocialButton from './SocialButton';

interface ContentProps {
  children: ReactNode;
  featuredPost: RawPost;
  tagCounts: Record<string, number>;
  author: Author;
  sidebarBeforeChildren?: ReactNode;
  sidebarAfterChildren?: ReactNode;
}

const Content = ({
  children,
  featuredPost,
  tagCounts,
  author,
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
        <SidebarBox title="On Social Media">
          <HStack mt={4} justifyContent="center">
            <SocialButton
              w="25%"
              icon={FaTwitter}
              onClick={() =>
                window.open(`https://twitter.com/${author.twitter}`, '_blank')
              }
            />
            <SocialButton
              w="25%"
              icon={FaLinkedinIn}
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/in/${author.linkedin}`,
                  '_blank',
                )
              }
            />
          </HStack>
        </SidebarBox>
        <FeaturedPost post={featuredPost} />
        <Topics tagCounts={tagCounts} />
        {sidebarAfterChildren}
      </VStack>
    </Box>
  </Flex>
);

export default Content;
