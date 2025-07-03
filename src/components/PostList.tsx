'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/store/useSearchStore';

type Post = {
  slug: string;
  title: string;
  date: string;
};

export default function PostList() {
  const keyword = useSearchStore((state) => state.keyword.toLowerCase());

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  const filteredPosts = data!.filter((post) =>
    post.title.toLowerCase().includes(keyword)
  );

  if (filteredPosts.length === 0) return <p>該当する記事はありません。</p>;

  return (
    <ul>
      {filteredPosts.map((post) => (
        <li key={post.slug}>
          <a href={`/posts/${post.slug}`}>{post.title}</a>
        </li>
      ))}
    </ul>
  );
}
