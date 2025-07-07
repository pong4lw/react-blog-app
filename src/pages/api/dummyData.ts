// dummyData.ts
import { Article } from './type';

export const articles: Article[] = [
  {
    id: 1,
    title: 'React入門',
    content: 'Reactの基本について解説します。',
    category: 'フロントエンド',
    tags: ['React', 'JavaScript'],
  },
  {
    id: 2,
    title: 'Node.jsでAPIを作成する',
    content: 'Expressを使ってAPIを作成する方法を紹介します。',
    category: 'バックエンド',
    tags: ['Node.js', 'Express'],
  },
  {
    id: 3,
    title: 'Tailwind CSSの使い方',
    content: 'ユーティリティファーストなCSSフレームワーク。',
    category: 'フロントエンド',
    tags: ['CSS', 'Tailwind'],
  },
];
