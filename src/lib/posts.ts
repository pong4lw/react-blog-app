import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import { remark } from 'remark';
import parse from 'remark-parse';
import strip from 'strip-markdown';
import stringify from 'remark-stringify';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export type PostMeta = {
  id: string;
  title: string;
  date: string;
  description?: string;
  contentText?: string; // 検索用
  category?: string;
  tags?: string[];
};

export type PostDetail = {
  id: string;
  title: string;
  date: string;
  contentHtml: string;
  contentText: string; // 検索用
  category?: string;
  tags?: string[];
};

export function getSortedPostsData(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // プレーンテキストに変換
    const file = unified()
      .use(parse)
      .use(strip)
      .use(stringify)
      .processSync(matterResult.content);
    const contentText = file.toString();

    return {
      id,
      ...(matterResult.data as { title: string; date: string; description?: string }),
      contentText,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => ({
    params: {
      slug: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string): Promise<PostDetail> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  const plainText = await unified()
    .use(parse)
    .use(strip)
    .use(stringify)
    .process(matterResult.content);

  return {
    id,
    contentHtml,
    contentText: plainText.toString(),
    ...(matterResult.data as { title: string; date: string }),
  };
}
