'use client';

import React, { useMemo } from 'react';
import Head from 'next/head';
import { useSearchStore } from '@/store/useSearchStore';
import { useQuery } from '@tanstack/react-query';

import SearchBox from '@/components/SearchBox';
import FilteredPostList from '@/components/FilteredPostList';
import CategorySelect from './CategorySelect';
import TagSelect from './TagSelect';

import NewPostForm from './NewPostForm'; 


// 型は関数の外で宣言
type Post = {
  slug: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
};

type Props = {
  children: React.ReactNode;
};


export default function Layout({ children }: Props) {
  const keyword = useSearchStore((state) => state.keyword);
  const category = useSearchStore((state) => state.category) ?? '';
  const tag = useSearchStore((state) => state.tag) ?? '';

  const { data, isLoading, error, refetch } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });

  // フィルタリング処理
  const filteredPosts = useMemo(() => {
    if (!data) return [];
    const lowerKeyword = keyword.toLowerCase();
    return data.filter((post) => {
      const matchKeyword =
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.content.toLowerCase().includes(lowerKeyword);
      const matchCategory = category ? post.category === category : true;
      const matchTag = tag ? (post.tags ?? []).includes(tag) : true;

      return matchKeyword && matchCategory && matchTag;
    });
  }, [data, keyword, category, tag]);

  // カテゴリとタグ一覧を作成
  const categories = useMemo(() => Array.from(new Set(data?.map((p) => p.category) ?? [])), [data]);
  const tags = useMemo(() => Array.from(new Set(data?.flatMap((p) => p.tags) ?? [])), [data]);

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>

      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My Blog</h1>
      </header>

      <main className="flex flex-col md:flex-row max-w-4xl mx-auto mt-8">
        <div className="md:w-3/4">
          {children}
        </div>

        <aside className="md:w-1/4 md:pl-8 mt-4 md:mt-0">
          <SearchBox />
          <CategorySelect categories={categories} />
          <TagSelect tags={tags} />
          <FilteredPostList posts={filteredPosts} isLoading={isLoading} error={error} />
          <NewPostForm onSuccess={refetch} categories={categories} tags={tags} />
        </aside>
      </main>

      <footer className="text-center text-sm text-gray-500 mt-10 mb-4">© 2025 My Blog</footer>
    </>
  );
}