import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

// Zustand ストアのモック関数
const setKeywordMock = jest.fn();

// ストアの型
type SearchState = {
  keyword: string;
  setKeyword: (value: string) => void;
};

// useSearchStore をモック
jest.mock('@/store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

// モックをインポート（上書き可能にする）
import { useSearchStore } from '@/store/useSearchStore';

beforeAll(() => {
  (useSearchStore as unknown as jest.Mock).mockImplementation = <T,>(
    selector: (state: SearchState) => T
  ): T =>
    selector({
      keyword: '',
      setKeyword: setKeywordMock,
    });
});

describe('SearchBox コンポーネント', () => {
  beforeEach(() => {
    setKeywordMock.mockClear();
  });

  it('入力に応じて setKeyword が呼ばれる（fireEvent.change）', () => {
    render(<SearchBox />);
    const input = screen.getByPlaceholderText('タイトル・本文・概要で検索');

    fireEvent.change(input, { target: { value: 'React' } });

    expect(setKeywordMock).toHaveBeenCalledTimes(1);
    expect(setKeywordMock).toHaveBeenCalledWith('React');
  });
});
