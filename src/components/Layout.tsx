'use client';

import React, { useMemo } from 'react';
import Head from 'next/head';
import { useSearchStore } from '@/store/useSearchStore';
import { useQuery } from '@tanstack/react-query';

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
  const setKeyword = useSearchStore((state) => state.setKeyword);
  const category = useSearchStore((state) => state.category) ?? '';
  const setCategory = useSearchStore((state) => state.setCategory);
  const tag = useSearchStore((state) => state.tag) ?? '';
  const setTag = useSearchStore((state) => state.setTag);

  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch posts');
      return res.json();
    },
  });

  const categories = useMemo(() => Array.from(new Set(data?.map((p) => p.category) ?? [])), [data]);
  const tags = useMemo(() => Array.from(new Set(data?.flatMap((p) => p.tags) ?? [])), [data]);

  // 検索・カテゴリ・タグで絞り込み
  const filteredPosts = useMemo(() => {
    if (!data) return [];
    const lowerKeyword = keyword.toLowerCase();
    return data.filter((post) => {
      const matchKeyword =
        post.title.toLowerCase().includes(lowerKeyword) ||
        post.content.toLowerCase().includes(lowerKeyword);
      const matchCategory = category ? post.category === category : true;
      const matchTag = tag ? post.tags.includes(tag) : true;
      return matchKeyword && matchCategory && matchTag;
    });
  }, [data, keyword, category, tag]);

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My Blog</h1>
      </header>
      <main className="flex flex-col md:flex-row max-w-4xl mx-auto mt-8">
        {/* メインコンテンツ */}
        <div className="md:w-3/4">{children}</div>

        {/* サイドバー */}
        <aside className="md:w-1/4 md:pl-8 mt-4 md:mt-0">
          {/* 検索ボックス */}
          <input
            type="text"
            placeholder="タイトル・本文・概要で検索"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />

          {/* カテゴリ選択 */}
          <h2 className="font-bold mb-2">カテゴリ</h2>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value || '')}
            className="w-full mb-4"
          >
            <option value="">すべて</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* タグ選択 */}
          <h2 className="font-bold mb-2">タグ</h2>
          <select
            value={tag}
            onChange={(e) => setTag(e.target.value || '')}
            className="w-full mb-6"
          >
            <option value="">すべて</option>
            {tags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* 絞り込み結果 */}
          <h2 className="font-bold mb-2">検索結果</h2>
          {isLoading ? (
            <p className="text-gray-500">読み込み中...</p>
          ) : error ? (
            <p className="text-red-500">記事の読み込みに失敗しました。</p>
          ) : filteredPosts.length === 0 ? (
            <p>該当する記事はありません。</p>
          ) : (
            <ul className="space-y-1 max-h-[300px] overflow-auto border p-2 rounded">
              {filteredPosts.map((post) => (
                <li key={post.slug}>
                  <a
                    href={`/posts/${post.slug}`}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
      <footer className="text-center text-sm text-gray-500 mt-10 mb-4">
        © 2025 My Blog
      </footer>
    </>
  );
}
