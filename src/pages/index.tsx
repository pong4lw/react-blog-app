import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import { getSortedPostsData, PostMeta } from '../lib/posts';
import Link from 'next/link';

type Props = {
  allPostsData: PostMeta[];
};

export default function Home({ allPostsData }: Props) {
  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-6">最新記事</h2>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id} className="mb-4">
            <Link href={`/posts/${id}`} className="text-blue-600 hover:underline">
              {title}
            </Link>
            <div className="text-gray-500 text-sm">{date}</div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
