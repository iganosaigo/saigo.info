import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useParams } from 'react-router-dom';
import { Center, Textarea, Box, HStack, Input, VStack } from '@chakra-ui/react';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useGetPostByIdQuery,
} from '../../services/blogApi';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Shared/Spinner';
import { useMDEOptions } from './MDEoptions';

import ActionButton from '../Shared/ActionButton';
import { IPostState } from '../../types';

const PostEditor: React.FC = () => {
  const MDEoptions = useMDEOptions();
  const [skipPostFetch, setSkipPostFetch] = React.useState<boolean>(true);
  const [postEntities, setPostEntities] = React.useState<IPostState>({
    title: '',
    description: '',
    content: '',
    tags: [],
    estimated: 5,
  });

  const navigate = useNavigate();
  const { postId } = useParams() as { postId: string };
  const isEditing = Boolean(postId);

  const [createPost, { isLoading: createPostIsLoading }] = useCreatePostMutation();
  const [updatePost, { isLoading: updatePostIsLoading }] = useUpdatePostMutation();
  const { data: postData, isLoading: fetchPostIsLoading } = useGetPostByIdQuery(
    postId,
    { skip: skipPostFetch },
  );

  const handleChangeContent = React.useCallback((value: string) => {
    setPostEntities((prevState) => ({
      ...prevState,
      content: value,
    }));
  }, []);

  const handleChangeField = (
    event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    let new_value: string | string[] | number = value;
    if (name === 'tags') {
      new_value = value.split(',');
    }
    setPostEntities((prevState) => ({
      ...prevState,
      [name]: new_value,
    }));
  };

  const onClickCancel = () => {
    if (isEditing) {
      navigate(`/blog/${postId}`);
    } else {
      navigate(-1);
    }
  };

  const onClickApply = async () => {
    const postData = {
      ...postEntities,
      tags: postEntities.tags.map((tag) => tag.trim()),
    };
    try {
      let result;
      if (isEditing && postId) {
        result = await updatePost({ postId, ...postData }).unwrap();
      } else {
        result = await createPost(postData).unwrap();
      }
      navigate(`/blog/${result.postId}`);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (isEditing) {
      setSkipPostFetch(false);
    }
  }, [isEditing]);

  React.useEffect(() => {
    if (postData) {
      const { title, description, content, tags, estimated } = postData;
      setPostEntities({
        title,
        description,
        content,
        tags,
        estimated,
      });
    }
  }, [postData]);

  if (fetchPostIsLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Box my="4">
        <Textarea
          name="title"
          value={postEntities.title}
          onChange={handleChangeField}
          placeholder="Title..."
          variant="flushed"
          fontSize="2xl"
        />
        <Textarea
          name="description"
          value={postEntities.description}
          onChange={handleChangeField}
          placeholder="Description..."
          variant="flushed"
          fontSize="2xl"
        />
        <VStack align="left">
          <Input
            name="tags"
            value={postEntities.tags}
            mt="4"
            w="350px"
            placeholder="Tags..."
            onChange={handleChangeField}
          />
          <Input
            name="estimated"
            value={postEntities.estimated}
            mt="4"
            w="120px"
            placeholder="Estimated..."
            onChange={handleChangeField}
          />
        </VStack>
      </Box>
      <SimpleMDE
        value={postEntities.content}
        onChange={handleChangeContent}
        options={MDEoptions}
        // getCodemirrorInstance={getCmInstanceCallback}
      />
      <Center>
        <HStack align="center" mt="4">
          <ActionButton
            onClick={onClickApply}
            isLoading={createPostIsLoading || updatePostIsLoading}
          >
            {isEditing ? 'Apply' : 'Add'}
          </ActionButton>
          <ActionButton onClick={onClickCancel}>Cancel</ActionButton>
        </HStack>
      </Center>
    </>
  );
};

export default PostEditor;
