'use client';

import { useSearchStore } from '@/store/useSearchStore';

const tags = ['', 'React', 'Next.js', 'JavaScript'];

export default function TagSelect() {
  const tag = useSearchStore((state) => state.tag);
  const setTag = useSearchStore((state) => state.setTag);

  return (
    <select
      value={tag}
      onChange={(e) => setTag(e.target.value)}
      className="p-2 border rounded mb-4"
    >
      {tags.map((t) => (
        <option key={t} value={t}>
          {t === '' ? 'すべてのタグ' : t}
        </option>
      ))}
    </select>
  );
}
