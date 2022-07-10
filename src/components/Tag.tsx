import { Badge, Link } from '@chakra-ui/react';

import { sluggify } from '@nullfox/nextjs-blog';
import NextLink from 'next/link';

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => (
  <NextLink key={tag} href={`/tag/${sluggify(tag)}`} passHref>
    <Link>
      <Badge
        boxShadow="inset 0 0 0px 1px var(--chakra-colors-themeGray-500)"
        color="themeGray.500"
        fontWeight="500"
        variant="outline"
        p={1.5}
        borderRadius={6}
        textTransform="none"
        transition="all 0.4s"
        _hover={{
          boxShadow: 'inset 0 0 0px 1px var(--chakra-colors-primary)',
          color: 'primary',
        }}
      >
        {tag}
      </Badge>
    </Link>
  </NextLink>
);

export default Tag;
