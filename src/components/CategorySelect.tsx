'use client';

import { useSearchStore } from '@/store/useSearchStore';

const categories = ['', 'Tech', 'Life', 'News']; // 空文字は未選択

export default function CategorySelect() {
  const category = useSearchStore((state) => state.category);
  const setCategory = useSearchStore((state) => state.setCategory);

  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border rounded mb-4"
    >
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat === '' ? 'すべてのカテゴリ' : cat}
        </option>
      ))}
    </select>
  );
}
