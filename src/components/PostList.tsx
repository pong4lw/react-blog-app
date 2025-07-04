'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchStore } from '@/store/useSearchStore';
import { useState, useMemo } from 'react';

type Post = {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
};

export default function PostList() {
  const keyword = useSearchStore((state) => state.keyword.toLowerCase());
  const selectedCategory = useSearchStore((state) => state.category);
  const selectedTag = useSearchStore((state) => state.tag);

  const { data, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      return res.json();
    },
    retry: 1,
  });

  // ✅ useMemo は無条件で呼ばれるようにする
  const categories = useMemo(
    () => Array.from(new Set(data?.map((p) => p.category) ?? [])),
    [data]
  );

  const tags = useMemo(
    () => Array.from(new Set(data?.flatMap((p) => p.tags) ?? [])),
    [data]
  );

  const filteredPosts = useMemo(() => {
    if (!data) return [];
    return data.filter((post) => {
      const keywordMatch =
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword);
      const categoryMatch = selectedCategory ? post.category === selectedCategory : true;
      const tagMatch = selectedTag ? post.tags.includes(selectedTag) : true;
      return keywordMatch && categoryMatch && tagMatch;
    });
  }, [data, keyword, selectedCategory, selectedTag]);

  // ✅ useMemo 呼び出しの後に return 分岐
  if (isLoading) return <p className="text-gray-500">読み込み中...</p>;
  if (error) return <p className="text-red-500">記事の取得に失敗しました: {error.message}</p>;
  if (filteredPosts.length === 0) return <p>該当する記事はありません。</p>;

  return (
    <ul className="space-y-4">
      {filteredPosts.map((post) => (
        <li key={post.slug} className="border-b pb-2">
          <a href={`/posts/${post.slug}`} className="text-blue-600 text-lg font-bold underline">
            {post.title}
          </a>
          <p className="text-sm text-gray-600 mt-1">{post.content}</p>
        </li>
      ))}
    </ul>
  );
}
