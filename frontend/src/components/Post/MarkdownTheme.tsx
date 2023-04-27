import { Box, Center, Link, Code, chakra } from '@chakra-ui/react';

const MarkdownTheme = {
  a: (props: any) => {
    const { children } = props;
    return (
      <Link href={props.href} isExternal={true} color={'#0969da'}>
        {children}
      </Link>
    );
  },
  code: (props: any) => {
    const { children } = props;
    return (
      <Code
        overflowWrap={'break-word'}
        boxSizing={'border-box'}
        px={'5px'}
        bg={'#edf2f7'}
        rounded="sm"
        // colorScheme='yellow'
      >
        {children}
      </Code>
    );
  },
  pre: (props: any) => {
    const { children } = props;
    return (
      <chakra.pre bg={'#edf2f7'} p={'16px'} my={'8px'} overflow="auto" rounded="sm">
        {children}
      </chakra.pre>
    );
  },
  blockquote: (props: any) => {
    const { children } = props;
    return (
      <chakra.blockquote
        dir="auto"
        padding={'0 1em'}
        color={'gray.300'}
        borderLeft={'.25em solid'}
      >
        <chakra.p color={'gray.600'} as={'i'}>
          {children}
        </chakra.p>
      </chakra.blockquote>
    );
  },
  h4: (props: any) => {
    const { children } = props;
    return (
      <chakra.h4 textAlign={'center'} my={'16px'} fontSize={'xl'} fontWeight={'bold'}>
        {children}
      </chakra.h4>
    );
  },
};

export default MarkdownTheme;
