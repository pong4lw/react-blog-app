import Layout from '../components/Layout';
import SearchBox from '../components/SearchBox';
import PostList from '../components/PostList';

export default function Home() {
  return (
    <Layout>
      <SearchBox />
      <PostList />
    </Layout>
  );
}
