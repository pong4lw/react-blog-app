'use client';
import { useState } from 'react';

type Props = {
  onSuccess?: () => void;
  categories: string[];
  tags: string[];
};

export default function NewPostForm({ onSuccess, categories, tags }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/save-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        category,
        tags: tagInput.split(',').map((tag) => tag.trim()),
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ 投稿を保存しました');
      setTitle('');
      setContent('');
      setCategory('');
      setTagInput('');
      onSuccess?.();
    } else {
      setMessage(`❌ エラー: ${data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mt-6 space-y-3">
      <h2 className="text-lg font-bold">📝 新しい投稿</h2>
      <input
        className="w-full border p-2"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full border p-2"
        placeholder="カテゴリ"
        list="category-options"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <datalist id="category-options">
        {categories.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>

      <input
        className="w-full border p-2"
        placeholder="タグ（カンマ区切り）"
        list="tag-options"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
      />
      <datalist id="tag-options">
        {tags.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>

      <textarea
        className="w-full border p-2"
        placeholder="本文（Markdown可）"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button className="bg-blue-600 text-white py-1 px-4 rounded" type="submit">
        投稿する
      </button>
      {message && <p className="text-sm mt-2">{message}</p>}
    </form>
  );
}
