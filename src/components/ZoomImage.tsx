import {
  AspectRatio,
  Box,
  BoxProps,
  Image,
  ImageProps,
  Link,
} from '@chakra-ui/react';

import NextLink from 'next/link';

interface ZoomImageProps extends BoxProps {
  image: string;
  href: string;
  aspect?: number;
  imageProps?: ImageProps;
}

const ZoomImage = ({
  image,
  href,
  aspect,
  imageProps,
  ...rest
}: ZoomImageProps) => (
  <Box h="100%" overflow="hidden" borderRadius={6} {...rest}>
    <Box w="full" h="100%">
      <NextLink href={href} passHref>
        <Link>
          {aspect && (
            <AspectRatio ratio={aspect}>
              <Image
                objectFit="cover"
                {...(imageProps || {})}
                className="zoom"
                src={image}
              />
            </AspectRatio>
          )}

          {!aspect && (
            <Image
              objectFit="cover"
              {...(imageProps || {})}
              className="zoom"
              src={image}
            />
          )}
        </Link>
      </NextLink>
    </Box>
  </Box>
);

export default ZoomImage;
