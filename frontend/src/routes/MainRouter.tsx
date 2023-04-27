import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Spinner from '../components/Shared/Spinner';
import { Fade } from '@chakra-ui/react';

const Loader = () => {
  return <Spinner />;
};

const Loadable = (Component: React.FC) => (props: any) => {
  return (
    <Suspense fallback={<Loader />}>
      <Fade in={true} unmountOnExit={true} delay={0.1}>
        <Component {...props} />
      </Fade>
    </Suspense>
  );
};

export default function MainRouter() {
  return useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/admin/users', element: <AdminUsersPage /> },
    { path: '/admin/add-user', element: <UserEditPage /> },
    { path: '/admin/users/:userId/edit', element: <UserEditPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/blog/', element: <BlogPage /> },
    { path: '/blog/:postId', element: <PostPage /> },
    { path: '/blog/:postId/edit', element: <AddPostPage /> },
    { path: '/add-post', element: <AddPostPage /> },
    { path: '*', element: <HomePage /> },
    // { path: '*', element: <NotFound /> },
  ]);
}

const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
const BlogPage = Loadable(lazy(() => import('../pages/BlogPage')));
const PostPage = Loadable(lazy(() => import('../pages/PostPage')));
const AddPostPage = Loadable(lazy(() => import('../pages/AddPostPage')));
const AboutPage = Loadable(lazy(() => import('../pages/AboutPage')));
const LoginPage = Loadable(lazy(() => import('../pages/LoginPage')));
const AdminUsersPage = Loadable(lazy(() => import('../pages/AdminUsersPage')));
const UserEditPage = Loadable(lazy(() => import('../pages/UserEditPage')));
