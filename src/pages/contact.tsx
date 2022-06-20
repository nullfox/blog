import { useState } from 'react';

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { FiSmile } from 'react-icons/fi';

import axios from 'axios';
import { NextSeo } from 'next-seo';

import Content from '../components/Content';
import Primary from '../layouts/Primary';
import { Post, getDefaultStaticProps } from '../services/content';

interface ContactProps {
  posts: Post[];
  featuredPost: Post;
  tagCounts: Record<string, number>;
}

const Contact = ({ posts, featuredPost, tagCounts }: ContactProps) => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null },
  });
  const [inputs, setInputs] = useState({
    email: '',
    message: '',
  });

  const handleServerResponse = (ok, msg) => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg: msg },
      });
      setInputs({
        email: '',
        message: '',
      });
    } else {
      setStatus({
        submitted: status.submitted,
        submitting: status.submitting,
        info: { error: true, msg: msg },
      });
    }
  };
  const handleOnChange = (e) => {
    e.persist();
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null },
    });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
    axios({
      method: 'POST',
      url: 'https://formspree.io/f/xpzbewvj',
      data: inputs,
    })
      .then((response) => {
        handleServerResponse(
          true,
          'Thank you, your message has been submitted.',
        );
      })
      .catch((error) => {
        handleServerResponse(false, error.response.data.error);
      });
  };

  const success = status.submitted && !status.info.error && status.info.msg;

  return (
    <Primary posts={posts} tags={Object.keys(tagCounts || {})}>
      <NextSeo
        title="Contact Javascript Consultant & Web Application Developer"
        description="Ben Fox blogging about TypeScript, open source, web application development and the cloud."
        openGraph={{
          url: 'https://www.nullfox.com',
          title: 'Contact Javascript Consultant & Web Application Developer',
          description:
            'Ben Fox blogging about TypeScript, open source, web application development and the cloud.',
          images: [{ url: 'https://www.nullfox.com/images/logo.png' }],
        }}
      />

      <Content tagCounts={tagCounts} featuredPost={featuredPost}>
        <Heading fontWeight="800" fontSize="3xl">
          Come say hello!
        </Heading>
        <Text fontSize="sm" fontWeight="400" color="themeGray.500">
          (Or hola, bonjour - maybe even guten tag)
        </Text>

        <Box w="full" mt={10} pr="15%">
          {status.info.error && (
            <Alert
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              status="error"
              bg="red.600"
              borderRadius={6}
              mb={8}
            >
              <AlertIcon color="white" />
              <AlertTitle>Message could not be sent!</AlertTitle>
              <AlertDescription>Reason: {status.info.msg}</AlertDescription>
            </Alert>
          )}

          {!success && (
            <form onSubmit={handleOnSubmit}>
              <FormControl>
                <FormLabel fontWeight="600" fontSize="xl">
                  Email
                </FormLabel>
                <Input
                  name="email"
                  onChange={handleOnChange}
                  type="email"
                  placeholder="test@test.com"
                />
              </FormControl>
              <FormControl mt={10}>
                <FormLabel fontWeight="600" fontSize="xl">
                  Message
                </FormLabel>
                <Textarea
                  name="message"
                  onChange={handleOnChange}
                  placeholder="I have project for you..."
                />
              </FormControl>
              <Button
                isLoading={status.submitting}
                bg="themeGray.100"
                borderWidth={1}
                borderColor="border"
                color="white"
                _hover={{ bg: '#1c2a73' }}
                width="full"
                mt={8}
                type="submit"
                size="lg"
                py={8}
              >
                Send Message
              </Button>
            </form>
          )}

          {success && (
            <VStack pt={10}>
              <Icon
                as={FiSmile}
                boxSize={16}
                color="rgba(255, 255, 255, 0.8)"
              />
              <Text fontSize="2xl" color="rgba(255, 255, 255, 0.8)">
                Your message been sent!
              </Text>
            </VStack>
          )}
        </Box>
      </Content>
    </Primary>
  );
};

export async function getStaticProps() {
  const props = await getDefaultStaticProps();

  return {
    props,
  };
}

export default Contact;
