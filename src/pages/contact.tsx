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
  HStack,
  Heading,
  Icon,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

import { FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';

import { PageSeo } from '@nullfox/nextjs-blog';
import { getPageStaticProps } from '@nullfox/nextjs-blog/content';
import axios from 'axios';
import { GetStaticProps } from 'next';

import Content from '../components/Content';
import SocialButton from '../components/SocialButton';
import Primary from '../layouts/Primary';

const Contact = ({ posts, featuredPosts, tagCounts }: PageProps) => {
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
      <PageSeo title="Contact Javascript Consultant & Web Application Developer" />

      <Content tagCounts={tagCounts} featuredPost={featuredPosts[0]}>
        <Heading fontWeight="800" fontSize="3xl">
          Come say hello!
        </Heading>
        <Text fontSize="sm" fontWeight="400" color="themeGray.500">
          (Or hola, bonjour - maybe even guten tag)
        </Text>

        <Text fontSize="2xl" fontWeight="600" color="themeGray.600" pt={10}>
          On my socials
        </Text>
        <HStack
          mt={4}
          borderBottomWidth={1}
          borderColor="border"
          pb={8}
          mb={8}
          mr="15%"
        >
          <SocialButton
            w="25%"
            icon={FaTwitter}
            onClick={() =>
              window.open('https://twitter.com/thenullfox', '_blank')
            }
          />
          <SocialButton
            w="25%"
            icon={FaLinkedinIn}
            onClick={() =>
              window.open('https://www.linkedin.com/in/nullfox', '_blank')
            }
          />
        </HStack>

        <Text fontSize="2xl" fontWeight="600" color="themeGray.600">
          Send a message
        </Text>
        <Box w="full" mt={4} pr="15%">
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
                <FormLabel fontWeight="600" color="themeGray.500" fontSize="lg">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  name="email"
                  onChange={handleOnChange}
                  type="email"
                  placeholder="test@test.com"
                />
              </FormControl>
              <FormControl mt={10}>
                <FormLabel fontWeight="600" color="themeGray.500" fontSize="lg">
                  Message
                </FormLabel>
                <Textarea
                  id="message"
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

export const getStaticProps: GetStaticProps = async () =>
  getPageStaticProps({});

export default Contact;
