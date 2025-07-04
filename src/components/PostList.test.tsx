import { render, screen } from '@testing-library/react';
import PostList from './PostList';
import { useSearchStore } from '@/store/useSearchStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

jest.mock('@/store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

describe('PostList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchStore as jest.Mock).mockImplementation((selector) =>
      selector({
        keyword: '',
        category: null,
        tag: null,
      })
    );
  });

  it('ローディング状態を表示する', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(screen.getByText(/読み込み中/)).toBeInTheDocument();
  });

  it('該当記事がない場合の表示をする', async () => {
    global.fetch = jest.fn((): Promise<Response> =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              slug: 'test-1',
              title: 'React入門',
              content: '基本的な内容',
              category: '技術',
              tags: ['React'],
            },
          ]),
      })
    } as Response)

    (useSearchStore as jest.Mock).mockImplementation((selector) =>
      selector({
        keyword: 'Vue',
        category: null,
        tag: null,
      })
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText(/該当する記事はありません/)
    ).toBeInTheDocument();
  });

  it('フィルタリングされた記事を表示する', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              slug: 'react',
              title: 'React入門',
              content: '基本的な内容',
              category: '技術',
              tags: ['React'],
            },
            {
              slug: 'vue',
              title: 'Vue入門',
              content: 'Vueの基本',
              category: '技術',
              tags: ['Vue'],
            },
          ]),
      })
    ) as jest.Mock;

    (useSearchStore as jest.Mock).mockImplementation((selector) =>
      selector({
        keyword: 'React',
        category: null,
        tag: null,
      })
    );

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <PostList />
      </QueryClientProvider>
    );

    expect(await screen.findByText('React入門')).toBeInTheDocument();
    expect(screen.queryByText('Vue入門')).not.toBeInTheDocument();
  });
});
