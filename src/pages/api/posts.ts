import type { NextApiRequest, NextApiResponse } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function handler(  
  _req: NextApiRequest,
  res: NextApiResponse
  ) {
  const posts = getSortedPostsData(); // ← この中で content も含めるようにする
  // contentHtml（HTML）ではなくプレーンテキストを使いたいなら
  const plainPosts = posts.map((post) => ({
    slug: post.id,
    title: post.title,
    description: post.description,
    content: post.contentText ?? '', // 追加：本文をプレーンテキストで
  }));
  res.status(200).json(plainPosts);
}
