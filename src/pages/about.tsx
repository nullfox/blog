import { Box, Heading, Text, VStack } from '@chakra-ui/react';

import { PageSeo } from '@nullfox/nextjs-blog';
import { getPageStaticProps } from '@nullfox/nextjs-blog/content';
import { GetStaticProps } from 'next';

import Content from '../components/Content';
import Primary from '../layouts/Primary';

const About = ({ posts, featuredPosts, tagCounts, author }: PageProps) => {
  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
      <PageSeo title="About Javascript Consultant & Web Application Developer" />

      <Content
        tagCounts={tagCounts}
        featuredPost={featuredPosts[0]}
        author={author}
      >
        <Box
          borderRadius={4}
          bgImage="linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(/images/about.jpg)"
          bgSize="100%"
          bgPosition="10% 50%"
          w="full"
          h="40vh"
          order={{ base: 0, lg: 1 }}
          mb={10}
        />

        <Heading fontWeight="800" fontSize="3xl">
          Hey there, I'm Ben
        </Heading>

        <VStack alignItems="flex-start" pt={8} spacing={6}>
          <Text>
            I am a San Francisco based full-stack engineer, leader, and driver
            of engineering innovation, with over 15 years of industry experience
            architecting solutions for both startups, as well as enterprise
            companies.
          </Text>

          <Text>
            I offer deep technical knowledge, strong cross-functional
            collaboration, as well as business acumen, bringing an
            entrepreneurial mindset to engineering organizations, teams, and
            projects.
          </Text>

          <Text>
            My experience and enthusiasm ranges from, but is not limited to, the
            architecture and implementation of elegant and pragmatic web
            applications (NodeJS, React), deployed at scale to cloud
            infrastructure, as well as automated testing, and adaptation of KPI
            metrics to enable observability.
          </Text>

          <Text>
            Over the course of my engineering tenure, I have learned how to
            assess organizational and procedural gaps and transform them into
            effective solutions, managing the software development life cycle
            from requirements to deployment.
          </Text>

          <Text>
            I am truly passionate about driving change through programmatic,
            innovative architectural solutions that meet both the needs of the
            business, as well as the diverse needs and technical capabilities of
            my clients or targeted end-users.
          </Text>

          <Text>
            I consider my ability to execute on this philosophy to be one of my
            greatest strengths.
          </Text>
        </VStack>
      </Content>
    </Primary>
  );
};

export const getStaticProps: GetStaticProps = async () =>
  getPageStaticProps({});

export default About;
