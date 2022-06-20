import { Box, HStack, useToast } from '@chakra-ui/react';

import { FaCopy, FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { NextSeo } from 'next-seo';
import { join } from 'path';

import Content from '../components/Content';
import FeaturedPost from '../components/FeaturedPost';
import SocialButton from '../components/SocialButton';
import Primary from '../layouts/Primary';
import { Post, getDefaultStaticProps, getPostPaths } from '../services/content';

interface SlugProps {
  posts: Post[];
  post: Post;
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Slug = ({ post, featuredPost, posts, tagCounts }: SlugProps) => {
  const toast = useToast();

  if (!post) {
    return null;
  }

  const url = `https://nullfox.com/${post.slug}`;

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${
        post.meta.title
      }&url=${encodeURIComponent(url)}`,
      'shareWindow',
      'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=650,height=400',
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      'shareWindow',
      'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=650,height=400',
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url,
      )}`,
      'shareWindow',
      'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=600,height=700',
    );
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);

      toast({
        title: 'Link copied to clipboard!',
        status: 'success',
        duration: 4000,
        isClosable: true,
        variant: 'toastSuccess',
      });
    } catch {
      toast({
        title: 'Link could not be copied!',
        status: 'error',
        duration: 4000,
        isClosable: true,
        variant: 'toastError',
      });
    }
  };

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
      <NextSeo
        title={post.meta.title}
        description={post.meta.description}
        openGraph={{
          url,
          title: post.meta.title,
          description: post.meta.description,
          images: [{ url: post.meta.image }],
        }}
      />

      <Box pt={{ base: 6, lg: 16 }} px={{ base: '5%', lg: 0 }}>
        <FeaturedPost post={post} linkTitle={false}>
          <HStack w="full" pt={6}>
            <SocialButton
              w="25%"
              icon={FaTwitter}
              onClick={() => shareToTwitter()}
            />
            <SocialButton
              w="25%"
              icon={FaFacebook}
              onClick={() => shareToFacebook()}
            />
            <SocialButton
              w="25%"
              icon={FaLinkedinIn}
              onClick={() => shareToLinkedIn()}
            />
            <SocialButton
              w="25%"
              icon={FaCopy}
              onClick={() => copyToClipboard()}
            />
          </HStack>
        </FeaturedPost>
      </Box>

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <ReactMarkdown
          className="content-md"
          children={post.content}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  language={match[1]}
                  PreTag="div"
                  style={agate}
                  customStyle={{
                    backgroundColor: 'transparent',
                    padding: 0,
                  }}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </Content>
    </Primary>
  );
};

export async function getStaticPaths() {
  const postPaths = await getPostPaths();

  return {
    paths: postPaths.map((slug) => ({
      params: {
        slug,
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const props = await getDefaultStaticProps();
  const post = props.posts.find((post) => post.slug === slug);

  return {
    props: {
      post,
      ...props,
    },
  };
}

export default Slug;
