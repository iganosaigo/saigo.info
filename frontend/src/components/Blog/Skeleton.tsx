import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC<{}> = () => (
  <ContentLoader
    speed={3}
    width={632}
    height={165}
    viewBox="0 0 476 124"
    backgroundColor="#f8f7f7"
    foregroundColor="#ecebeb"
  >
    <rect x="7" y="15" rx="3" ry="3" width="50" height="3" />
    <rect x="7" y="25" rx="3" ry="3" width="250" height="8" />
    <rect x="7" y="45" rx="3" ry="3" width="440" height="4" />
    <rect x="7" y="60" rx="3" ry="3" width="440" height="4" />

    {/* created */}
    <rect x="7" y="80" rx="3" ry="3" width="81" height="2" />
    {/* BY WHO */}
    <rect x="7" y="95" rx="3" ry="3" width="81" height="2" />

    {/* READ Link */}
    <rect x="400" y="82" rx="3" ry="3" width="52" height="8" />

    {/* TAGS */}
    <rect x="7" y="115" rx="3" ry="3" width="178" height="6" />
    {/*
    <rect x="11" y="65" rx="3" ry="3" width="81" height="2" />
    <rect x="9" y="75" rx="3" ry="3" width="81" height="2" /> */}
  </ContentLoader>
);
