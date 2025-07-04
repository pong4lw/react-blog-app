// pages/404.tsx
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="mb-6">お探しのページは存在しないか、移動された可能性があります。</p>
      <Link href="/" className="text-blue-600 underline">
        ホームに戻る
      </Link>
    </div>
  );
}
