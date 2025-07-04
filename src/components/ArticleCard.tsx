// ArticleCard.tsx
import { Article } from './type';

export default function ArticleCard({ article }: { article: Article }) {
console.log(article);
  return (
    <div className="p-4 border rounded mb-3">
      <h2 className="text-xl font-bold">{article.title}</h2>
      <p className="text-gray-600 mb-1">カテゴリ: {article.category}</p>
      <p className="mb-2 text-sm">タグ: {article.tags.join(', ')}</p>
      <p>{article.content}</p>
    </div>
  );
}
