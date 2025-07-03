import type { NextApiRequest, NextApiResponse } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const posts = getSortedPostsData();

  const summary = posts.map(({ id, title, date }) => ({
    slug: id,
    title,
    date,
  }));

  res.status(200).json(summary);
}
