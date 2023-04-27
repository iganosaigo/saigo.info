import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownTheme from './MarkdownTheme';

const MarkDown: React.FC<{ children: string }> = ({ children }) => {
  return (
    <>
      <ReactMarkdown
        components={ChakraUIRenderer(MarkdownTheme)}
        children={children}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </>
  );
};

export default MarkDown;
