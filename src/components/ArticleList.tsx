// ArticleList.tsx
import { useState, useMemo } from 'react';
import { articles } from '../pages/api/dummyData';
import ArticleCard from './ArticleCard';

export default function ArticleList() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const tags = Array.from(new Set(articles.flatMap((a) => a.tags)));

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const categoryMatch = selectedCategory ? a.category === selectedCategory : true;
      const tagMatch = selectedTag ? a.tags.includes(selectedTag) : true;
      return categoryMatch && tagMatch;
    });
  }, [selectedCategory, selectedTag]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">記事一覧</h1>

      <div className="mb-4">
        <label className="mr-2">カテゴリ:</label>
        <select
          value={selectedCategory ?? ''}
          onChange={(e) => setSelectedCategory(e.target.value || null)}
        >
          <option value="">全て</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mr-2">タグ:</label>
        <select
          value={selectedTag ?? ''}
          onChange={(e) => setSelectedTag(e.target.value || null)}
        >
          <option value="">全て</option>
          {tags.map((tag) => (
            <option key={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">該当する記事はありません。</p>
      ) : (
        filtered.map((article) => <ArticleCard key={article.id} article={article} />)
      )}
    </div>
  );
}
