import React, { lazy, Suspense } from 'react';
import { chakra, Box, HStack, Stack, Link, Text, Icon, Flex } from '@chakra-ui/react';
import { GoChevronRight } from 'react-icons/go';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { dateFormatCreated } from '../../utils';
import { useAppSelector, selectIsLoggedIn } from '../../redux/hooks';
import { useDeletePostMutation } from '../../services/blogApi';
import { IPost } from '../../types';
import { TagList } from './TagList';

interface Props {
  post: IPost;
}

const AdminButtons = lazy(() => import('./AdminButtons'));

export const PostCard: React.FC<Props> = ({ post }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const navigate = useNavigate();

  const handleClickDelete = async () => {
    if (window.confirm(`Delete post ${post.title}?`)) {
      try {
        await deletePost(post.postId);
        navigate('/blog');
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Stack direction="column">
      <Box textAlign="left">
        <Box fontSize="sm" color="gray.500" fontStyle="italic" mb="1">
          {post.estimated} min read
        </Box>
        <Box>
          <HStack mb="2">
            <TagList tags={post.tags} />
          </HStack>
        </Box>
        <Flex my="1" justify="space-between" align="center">
          <Link
            as={RouterLink}
            to={`/blog/${post.postId}`}
            fontSize="xl"
            lineHeight="1.2"
            fontWeight="bold"
            w="100%"
            _hover={{ color: 'blue.400', textDecoration: 'underline' }}
          >
            {post.title}
          </Link>
          {isLoggedIn ? (
            <Suspense fallback={<></>}>
              <AdminButtons
                post={post}
                handleClickDelete={handleClickDelete}
                isLoading={isLoading}
              />
            </Suspense>
          ) : null}
        </Flex>
        <Text fontSize="md" color="gray.500" noOfLines={3} lineHeight="normal">
          {post.description}
        </Text>
      </Box>
      <Box>
        <Text fontStyle={'italic'} fontSize="sm" color="gray.500">
          {dateFormatCreated(post.created)}
        </Text>
        <Flex justify="space-between" align="center" mr="6">
          <Text fontSize="sm">
            By{' '}
            <chakra.span fontWeight="bold" color="blue.400" as={Link}>
              @{post.writer}
            </chakra.span>
          </Text>
          <HStack
            as={RouterLink}
            to={`/blog/${post.postId}`}
            spacing="1"
            px="2"
            py="1"
            rounded="md"
            color="blue.400"
            _hover={{ bg: 'gray.200' }}
          >
            <Text fontSize="sm">Read more</Text>
            <Icon as={GoChevronRight} w="4" h="4" />
          </HStack>
        </Flex>
      </Box>
    </Stack>
  );
};
