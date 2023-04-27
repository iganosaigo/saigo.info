import React from 'react';
import { Center, VStack } from '@chakra-ui/react';
import { useGetPagesQuery } from '../../services/blogApi';
import { useAppSelector, selectPages } from '../../redux/hooks';
import Spinner from '../Shared/Spinner';
import { Paginator } from './Paginator';
import { ErrorUnknown } from '../Errors';
import { PostList } from './PostList';
import { useAppDispatch } from '../../redux/hooks';

import { blogApi } from '../../services/blogApi';

const Blog: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  const {
    currentPage,
    totalPages,
    pageSize,
    filters_tags: tags,
  } = useAppSelector(selectPages);
  const {
    data: postList,
    error,
    isLoading,
    isFetching,
  } = useGetPagesQuery(
    {
      page: currentPage,
      pageSize: pageSize,
      sort: 'created',
      order: 'desc',
      filters: { tags },
    },
    {
      pollingInterval: 1000000,
      // refetchOnMountOrArgChange: true,
    },
  );

  React.useEffect(() => {
    dispatch(blogApi.util.invalidateTags([{ type: 'Posts', id: 'LIST' }]));
  }, [tags, dispatch]);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorUnknown />;
  }

  return (
    <>
      <VStack mx="auto" align="normal">
        {postList ? <PostList postList={postList.data} /> : null}
      </VStack>

      {totalPages > 1 ? (
        <Center mt="4">
          <Paginator />
        </Center>
      ) : null}
    </>
  );
};

export default Blog;
