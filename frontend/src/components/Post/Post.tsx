import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../services/blogApi';
import { dateFormatCreated } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ErrorUnknown } from '../Errors';
import AdminButtons from './AdminButtons';

import { chakra, Box, Heading, HStack, Link, Text, Tag } from '@chakra-ui/react';

import Spinner from '../Shared/Spinner';
import { useDeletePostMutation } from '../../services/blogApi';
import MarkDown from './MarkDown';

const Post: React.FC = () => {
  const { postId } = useParams() as { postId: string };
  const { data: postData, isError, isLoading } = useGetPostByIdQuery(postId);
  const [deletePost, { isLoading: isLoadingDelete }] = useDeletePostMutation();

  const navigate = useNavigate();

  // TODO: Move that logic to RTK Q section
  const postCreated = postData ? dateFormatCreated(postData.created) : 'Unknown';

  const handleClickDelete = async () => {
    // @ts-ignore
    if (window.confirm(`Delete post ${postData.title}?`)) {
      try {
        // @ts-ignore
        await deletePost(postData.postId);
        navigate('/blog');
      } catch (err) {
        console.log(err);
      }
    }
  };


  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorUnknown />;
  }

  return (
    <>
      {postData ? (
        <>
          <AdminButtons
            postId={postData.postId}
            isLoading={isLoadingDelete}
            handleClickDelete={handleClickDelete}
          />

          <HStack spacing="2" mb="4">
            {postData.tags.map((tag) => (
              <Tag key={tag} size="md" variant="outline" colorScheme="teal">
                {tag}
              </Tag>
            ))}
          </HStack>
          <Heading as="h3" lineHeight="1.1" my="4" fontSize="2xl" textAlign={'center'}>
            {postData.title}
          </Heading>

          <Box textAlign={'center'} mb="4">
            <Text color="gray.500" as="i">
              {postData.description}
            </Text>
          </Box>
          <MarkDown>{postData.content}</MarkDown>

          <HStack mt="8">
            <Text fontSize="sm">
              <chakra.span fontWeight="bold" color="blue.400" fontSize="lg" as={Link}>
                @{postData.writer}
              </chakra.span>
              {','}
            </Text>
            <Text fontStyle="italic" fontSize="lg" color="gray.500">
              {postCreated}
            </Text>
          </HStack>
        </>
      ) : null}
    </>
  );
};

export default Post;
