import { useState } from 'react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
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
        tags: tags.split(',').map((tag) => tag.trim()),
      }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">新しい投稿</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full border p-2" placeholder="カテゴリ" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input className="w-full border p-2" placeholder="タグ（カンマ区切り）" value={tags} onChange={(e) => setTags(e.target.value)} />
        <textarea className="w-full border p-2" rows={6} placeholder="本文（Markdown形式）" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">投稿</button>
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
