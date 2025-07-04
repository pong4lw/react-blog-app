'use client';

import { useSearchStore } from '@/store/useSearchStore';

export default function SearchBox() {
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);

  return (
    <input
      type="text"
      placeholder="タイトル・本文・概要で検索"
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      className="w-full p-2 border rounded mb-4"
    />
  );
}
