'use client';

import { useSearchStore } from '@/store/useSearchStore';

type Post = {
  slug: string;
  title: string;
  date: string;
};

type Props = {
  posts: Post[];
};

export default function PostList({ posts }: Props) {
  const keyword = useSearchStore((state) => state.keyword.toLowerCase());

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword)
  );

  if (filteredPosts.length === 0) {
    return <p>該当する記事はありません。</p>;
  }

  return (
    <ul className="space-y-2">
      {filteredPosts.map((post) => (
        <li key={post.slug}>
          <a href={`/posts/${post.slug}`} className="text-blue-600 underline">
            {post.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
