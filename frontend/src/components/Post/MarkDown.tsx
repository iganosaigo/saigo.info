import React from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import MarkdownTheme from './MarkdownTheme';

import { useLocation } from 'react-router-dom';

const remarkHeadingId = require('remark-heading-id');

const MarkDown: React.FC<{ children: string }> = ({ children }) => {
  const location = useLocation();
  const hash = location.hash;

  const removeHashCharacter = (str: string) => {
    const result = str.slice(1);
    // console.log('Hash element', result);
    return result;
  };

  React.useEffect(() => {
    let element: HTMLElement | null = null;

    if (hash) {
      element = document.getElementById(removeHashCharacter(hash));
    }

    if (hash && element) {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    }
  }, [hash]);

  return (
    <>
      <ReactMarkdown
        components={ChakraUIRenderer(MarkdownTheme)}
        children={children}
        remarkPlugins={[remarkGfm, remarkHeadingId]}
        rehypePlugins={[rehypeRaw]}
      />
    </>
  );
};

export default MarkDown;
