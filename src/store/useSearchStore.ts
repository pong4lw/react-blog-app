import { create } from 'zustand';

type SearchState = {
  keyword: string;
  category: string;
  tag: string;
  setKeyword: (kw: string) => void;
  setCategory: (cat: string) => void;
  setTag: (tag: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  keyword: '',
  category: '',
  tag: '',
  setKeyword: (kw) => set({ keyword: kw }),
  setCategory: (cat) => set({ category: cat }),
  setTag: (tag) => set({ tag }),
}));
