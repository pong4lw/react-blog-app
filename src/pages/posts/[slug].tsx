import { GetStaticPaths, GetStaticProps } from 'next';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData, PostDetail } from '../../lib/posts';
import Head from 'next/head';

type Props = {
  postData: PostDetail;
};

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
        <div className="text-gray-500 text-sm mb-4">{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.slug as string);
  return {
    props: {
      postData,
    },
  };
};