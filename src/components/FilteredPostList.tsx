import React from 'react';

type Post = {
  slug: string;
  title: string;
};

type Props = {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
};

export default function FilteredPostList({ posts, isLoading, error }: Props) {
  if (isLoading) return <p className="text-gray-500">読み込み中...</p>;
  if (error) return <p className="text-red-500">記事の読み込みに失敗しました。</p>;
  if (posts.length === 0) return <p>該当する記事はありません。</p>;

  return (
    <ul className="space-y-1 max-h-[300px] overflow-auto border p-2 rounded">
      {posts.map((post) => (
        <li key={post.slug}>
          <a href={`/posts/${post.slug}`} className="text-blue-600 underline hover:text-blue-800">
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
