'use client';

import { useSearchStore } from '@/store/useSearchStore';

type TagSelectProps = {
  tags: string[];
};

export default function TagSelect({ tags }: TagSelectProps) {
  const selectedTag = useSearchStore((state) => state.tag);
  const setTag = useSearchStore((state) => state.setTag);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTag(e.target.value); // null を使わない
  };

  return (
    <select
      value={selectedTag ?? ''}
      onChange={handleChange}
      className="p-2 border rounded mb-4"
    >
      <option value="">すべてのタグ</option>
      {tags.map((tag) => (
        <option key={`tag-${tag}`} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
}
