import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { title, content, category, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'タイトルと本文は必須です' });
  }

  const slug = title.toLowerCase().replace(/\s+/g, '-');
  const fileName = `${slug}.md`;
  const filePath = path.join(process.cwd(), 'posts', fileName);

  const mdContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
category: "${category}"
tags: [${tags.map((tag: string) => `"${tag}"`).join(', ')}]
---

${content}
`;

  fs.writeFileSync(filePath, mdContent);

  res.status(200).json({ message: '投稿を保存しました', slug });
}
