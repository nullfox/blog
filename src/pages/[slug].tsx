import { Box, HStack, useToast } from '@chakra-ui/react';

import { FaCopy, FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { NextSeo } from 'next-seo';
import { join } from 'path';

import FeaturedPost from '../components/FeaturedPost';
import SocialButton from '../components/SocialButton';
import Primary from '../layouts/Primary';
import {
  Post,
  getPostPaths,
  getPosts,
  getTagCounts,
  getFeaturedPost,
} from '../services/content';
import Content from '../components/Content';

interface SlugProps {
  posts: Post[];
  post: Post;
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const CONTENT_ROOT = join(process.cwd(), 'content');

const Slug = ({ post, featuredPost, posts, tagCounts }: SlugProps) => {
  const toast = useToast();

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
      `https://www.facebook.com/sharer/sharer.php?u=${
        post.meta.title
      }&url=${encodeURIComponent(url)}`,
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
      'directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=yes,width=600,height=500',
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
    <Primary posts={posts} tags={Object.keys(tagCounts)}>
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

      <Box pt={16}>
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
  const postPaths = await getPostPaths(CONTENT_ROOT);

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
  const posts = await getPosts(CONTENT_ROOT);
  const tagCounts = await getTagCounts(CONTENT_ROOT);
  const post = posts.find((post) => post.slug === slug);
  const featuredPost = await getFeaturedPost(CONTENT_ROOT);

  return {
    props: {
      post,
      posts,
      featuredPost,
      tagCounts,
    },
    revalidate: 1,
  };
}

export default Slug;
