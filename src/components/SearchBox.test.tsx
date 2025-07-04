import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

// モック関数
const setKeywordMock = jest.fn();

// Zustandのstoreの型定義
type SearchState = {
  keyword: string;
  setKeyword: (value: string) => void;
};

// useSearchStore を jest.mock で定義
jest.mock('@/store/useSearchStore', () => ({
  useSearchStore: jest.fn(),
}));

import { useSearchStore } from '@/store/useSearchStore';

// 方法②: ジェネリックで型安全な mockImplementation を定義
(useSearchStore as jest.Mock).mockImplementation = <T,>(selector: (state: SearchState) => T): T =>
  selector({
    keyword: '',
    setKeyword: setKeywordMock,
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
