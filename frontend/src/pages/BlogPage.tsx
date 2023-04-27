import React from 'react';
import Blog from '../components/Blog';
import Search from '../components/Search/Search';
import { Container } from '@chakra-ui/react';

const BlogPage: React.FC<{}> = () => {
  return (
    <Container maxW="container.md" p="0">
      <Search />
      <Blog />
    </Container>
  );
};

export default BlogPage;
