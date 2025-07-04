'use client';

import { useSearchStore } from '@/store/useSearchStore';

type CategorySelectProps = {
  categories: string[];
};

export default function CategorySelect({ categories }: CategorySelectProps) {
  const category = useSearchStore((state) => state.category);
  const setCategory = useSearchStore((state) => state.setCategory);

  return (
    <select
      value={category ?? ''}
      onChange={(e) => setCategory(e.target.value)}
      className="p-2 border rounded mb-4"
    >
      {categories.map((cat, index) => (
        <option key={`${cat}-${index}`} value={cat}>
          {cat === '' ? 'すべてのカテゴリ' : cat}
        </option>
      ))}
    </select>
  );
}

