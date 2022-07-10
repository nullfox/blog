import { ReactNode, useCallback, useRef } from 'react';

import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { BiRss, BiSearch } from 'react-icons/bi';

import Fuse from 'fuse.js';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Search from '../components/Search';

interface PrimaryProps {
  children: ReactNode;
  posts: Post[];
  tags: string[];
}

interface NavigationLinkProps {
  href: string;
  label: string;
}

const NavigationLink = ({ href, label }: NavigationLinkProps) => (
  <NextLink href={href} passHref>
    <Link _hover={{ textDecoration: 'none' }}>
      <Box
        mx={4}
        p={2}
        borderBottom="1px solid transparent"
        transition="all 0.4s"
        _hover={{
          borderBottomColor: 'primary',
        }}
        sx={{
          '&:hover p': {
            color: 'primary',
          },
        }}
      >
        <Text letterSpacing={1} color="themeGray.700">
          {label}
        </Text>
      </Box>
    </Link>
  </NextLink>
);

const Primary = ({ children, posts, tags }: PrimaryProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const fuse = useRef(
    new Fuse(posts, {
      includeScore: true,
      keys: [
        {
          name: 'meta.tags',
          weight: 0.7,
        },
        {
          name: 'content',
          weight: 0.3,
        },
      ],
    }),
  );

  const search = useCallback(
    (query: string) => {
      const results = fuse.current.search(query);

      return results.map((result) => result.item);
    },
    ['posts'],
  );

  const goToPost = (slug: string) => {
    onClose();
    router.push(`/${slug}`);
  };

  return (
    <Flex direction="column" align="center" maxW={{ xl: '1280' }} m="0 auto">
      <Flex justifyContent="center" w="full" pt={4}>
        <NextLink href="/" passHref>
          <Link
            _hover={{
              filter:
                'brightness(0) saturate(100%) invert(39%) sepia(67%) saturate(757%) hue-rotate(317deg) brightness(101%) contrast(100%)',
              textDecoration: 'none',
              transition: 'all 0.4s',
            }}
          >
            <Image w={12} src="/images/logo.png" />
          </Link>
        </NextLink>
      </Flex>

      <Flex
        borderBottomWidth={1}
        borderBottomColor="border"
        borderTopWidth={1}
        borderTopColor="border"
        alignItems="center"
        justifyContent="space-between"
        w="full"
        mt={4}
      >
        <IconButton
          aria-label="Search"
          variant="ghost"
          size="md"
          icon={<BiRss />}
          onClick={() => window.open('/atom.xml', '_blank')}
          _hover={{
            bg: 'transparent',
            color: 'primary',
          }}
        />

        <Flex>
          <NavigationLink href="/" label="Home" />
          <NavigationLink href="/about" label="About" />
          <NavigationLink href="/contact" label="Contact" />
        </Flex>

        <IconButton
          aria-label="Search"
          variant="ghost"
          size="md"
          icon={<BiSearch />}
          onClick={() => onOpen()}
          _hover={{
            bg: 'transparent',
            color: 'primary',
          }}
        />
      </Flex>

      {children}

      <Modal onClose={onClose} size="full" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent borderRadius={0} bg="bg">
          <ModalBody>
            <Search
              tags={tags}
              onSearch={search}
              onClose={onClose}
              onClickPost={(slug: string) => goToPost(slug)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Primary;
