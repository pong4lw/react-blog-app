import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getSortedPostsData, PostMeta } from '../lib/posts';
import Link from 'next/link';
import SearchBox from '../components/SearchBox';
import PostList from '../components/PostList';

type Props = {
  allPosts: PostMeta[];
};

export default function Home({ allPosts }: Props) {
  return (
    <Layout>
      <SearchBox />
      <PostList posts={allPosts} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
};
