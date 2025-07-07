import type { NextApiRequest, NextApiResponse } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = getSortedPostsData();

  const plainPosts = posts.map((post) => ({
    slug: post.id,
    title: post.title,
    description: post.description,
    content: post.contentText ?? '',
    category: post.category ?? '',
    tags: post.tags ?? [],
    date: post.date ?? '',
  }));

  res.status(200).json(plainPosts);
}
