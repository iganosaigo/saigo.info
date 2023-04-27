import React from 'react';

export function useMDEOptions() {
  const opts = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      placeholder: 'Content...',
      status: false,
    }),
    [],
  );
  return opts;
}
