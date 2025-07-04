import { render, screen } from '@testing-library/react';
import { PostList } from './PostList';
import { useSearchStore } from '@/store/useSearchStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClientをテストごとに生成
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// useSearchStoreをjest.mockでモック化
jest.mock('@/store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

describe('PostList', () => {
  // テストごとにfetchのモックをリセット
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchStore as jest.Mock).mockReturnValue('');
  });

  it('ローディング状態を表示する', () => {
    // fetchが永遠に解決しない＝ローディング状態
    global.fetch = jest.fn(() => new Promise(() => {})) as any;

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(screen.getByText(/読み込み中/)).toBeInTheDocument();
  });

  it('記事の取得に失敗した場合エラーメッセージを表示する', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Internal Server Error',
      })
    ) as any;

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText(/記事の取得に失敗しました/)
    ).toBeInTheDocument();
  });

  it('該当記事がない場合の表示をする', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([{ slug: 'test-1', title: 'React入門', content: '基本的な内容' }]),
      })
    ) as any;

    (useSearchStore as jest.Mock).mockReturnValue('Vue'); // 検索語が不一致

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(await screen.findByText(/該当する記事はありません/)).toBeInTheDocument();
  });

  it('フィルタリングされた記事を表示する', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            { slug: 'react', title: 'React入門', content: '基本的な内容' },
            { slug: 'vue', title: 'Vue入門', content: 'Vueの基本' },
          ]),
      })
    ) as any;

    (useSearchStore as jest.Mock).mockReturnValue('React');

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(await screen.findByText('React入門')).toBeInTheDocument();
    expect(screen.queryByText('Vue入門')).not.toBeInTheDocument();
  });
});
