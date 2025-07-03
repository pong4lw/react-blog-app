'use client';

import { useSearchStore } from '../store/useSearchStore';

export default function SearchBox() {
  const keyword = useSearchStore((state) => state.keyword);
  const setKeyword = useSearchStore((state) => state.setKeyword);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="記事タイトルで検索"
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
