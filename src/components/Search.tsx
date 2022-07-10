import { useState } from 'react';

import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';

import { BiSearch, BiX } from 'react-icons/bi';

interface SearchProps {
  tags: string[];
  onSearch: (query: string) => Post[];
  onClose: () => void;
  onClickPost: (slug: string) => void;
}

const Search = ({ tags, onSearch, onClose, onClickPost }: SearchProps) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Post[]>([]);

  return (
    <Box w="full">
      <Flex w="full" justifyContent="center" pt={10}>
        <Flex w={{ base: '90%', lg: '50%' }}>
          <InputGroup
            h="66px"
            sx={{
              '&:hover input, &:focus input, &:focus-visible input': {
                borderColor: 'primary',
              },
            }}
          >
            <Input
              borderColor="border"
              bg="themeGray.100"
              placeholder="Search"
              fontSize="2xl"
              fontWeight="700"
              p={8}
              borderRadius={36}
              _focusVisible={{
                borderColor: 'primary',
              }}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onSubmit={() => setResults(onSearch(query))}
            />
            <InputRightElement
              children={
                <Box pr={14} pt={8}>
                  <Button
                    variant="unstyled"
                    onClick={() => {
                      setResults(onSearch(query));
                    }}
                  >
                    <Icon
                      as={BiSearch}
                      boxSize={8}
                      color="themeGray.400"
                      _hover={{
                        bg: 'transparent',
                        color: 'primary',
                      }}
                    />
                  </Button>
                </Box>
              }
            />
          </InputGroup>

          <Box ml={6}>
            <Button
              h="66px"
              w="66px"
              display="block"
              variant="unstyled"
              borderRadius="full"
              borderWidth={1}
              borderColor="border"
              bg="themeGray.100"
              _hover={{
                borderColor: 'primary',
              }}
              sx={{
                '&:hover svg': {
                  color: 'primary',
                },
              }}
              onClick={onClose}
            >
              <Icon
                as={BiX}
                mt={2}
                boxSize={8}
                color="themeGray.400"
                _hover={{
                  bg: 'transparent',
                  color: 'primary',
                }}
              />
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Center pt={10}>
        <HStack>
          {tags.map((tag) => (
            <Button
              bg="themeGray.100"
              borderRadius={36}
              fontWeight="400"
              fontSize="sm"
              borderWidth={1}
              borderColor="border"
              _hover={{
                borderColor: 'themeGray.300',
              }}
              onClick={() => {
                setQuery(tag);
                setResults(onSearch(tag));
              }}
            >
              {tag}
            </Button>
          ))}
        </HStack>
      </Center>

      <Flex w="full" justifyContent="center" pt={10}>
        <Flex w={{ base: '90%', lg: '40%' }} flexDir="column">
          {results.map((result) => (
            <Box w="full" key={result.slug} mb={4}>
              <Button
                variant="unstyled"
                display="block"
                w="full"
                textAlign="left"
                h="inherit"
                sx={{
                  '&:hover > div': {
                    borderColor: 'primary',
                  },
                  '&:hover > div .title': {
                    color: 'primary',
                  },
                }}
                onClick={() => onClickPost(result.slug)}
              >
                <Flex
                  bg="themeGray.100"
                  p={4}
                  borderRadius={6}
                  borderWidth={1}
                  borderColor="themeGray.100"
                >
                  <Image
                    w={16}
                    h={16}
                    objectFit="cover"
                    src={result.meta.image}
                    borderRadius={6}
                  />

                  <Box w="full" ml={6}>
                    <Text className="title" mt={1}>
                      {result.slug}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight="400"
                      color="themeGray.500"
                      mt={2}
                    >
                      {result.meta.excerpt}
                    </Text>
                  </Box>
                </Flex>
              </Button>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Search;
