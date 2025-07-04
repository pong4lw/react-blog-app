// SearchBox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

const setKeywordMock = jest.fn();

type SearchState = {
  keyword: string;
  setKeyword: (value: string) => void;
};

// モックの定義をグローバルスコープで正しく行う
jest.mock('@/store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

// useSearchStore を明確にキャストしてからモック実装
import { useSearchStore } from '@/store/useSearchStore';

(useSearchStore as jest.Mock).mockImplementation((selector: (state: SearchState) => any) =>
  selector({
    keyword: '',
    setKeyword: setKeywordMock,
  })
);

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
