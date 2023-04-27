import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPageMain {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalRecords: number;
  // data: IPost[]
}

interface IPageSliceState extends IPageMain {
  filters_tags: string[];
}

const initialState: IPageSliceState = {
  currentPage: 1,
  totalPages: 0,
  pageSize: 8,
  totalRecords: 0,
  filters_tags: [],
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    updatePageParams(state, action: PayloadAction<IPageMain>) {
      // state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalRecords = action.payload.totalRecords;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },

    setFilterTags(state, action: PayloadAction<string[]>) {
      state.filters_tags = action.payload;
    },

    rmFilterTag(state, action: PayloadAction<string>) {
      state.currentPage = 1;
      state.filters_tags = state.filters_tags.filter((tag) => tag !== action.payload);
    },

    addFilterTag(state, action: PayloadAction<string>) {
      state.currentPage = 1;
      const findTag = state.filters_tags.find((tag) => tag === action.payload);
      if (!findTag) {
        state.filters_tags.push(action.payload);
      }
    },

    clearFilterTag(state) {
      state.filters_tags = [];
    },

    clearPageState: () => initialState,
  },
});

export const {
  updatePageParams,
  setCurrentPage,
  setPageSize,
  clearPageState,
  setFilterTags,
  rmFilterTag,
  addFilterTag,
  clearFilterTag,
} = pagesSlice.actions;

export default pagesSlice.reducer;
