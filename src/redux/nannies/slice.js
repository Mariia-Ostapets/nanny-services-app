import { createSlice } from '@reduxjs/toolkit';
import { fetchNannies } from './operations';
import { applySorting, paginate } from '../../utils';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  items: [],
  page: 1,
  hasMore: false,
  sortBy: 'Show all',
  lastKey: null,
  loading: false,
  error: null,
};

const nanniesSlice = createSlice({
  name: 'nannies',
  initialState: INITIAL_STATE,
  reducers: {
    resetNannies: state => {
      state.items = [];
      state.page = 1;
      state.hasMore = false;
      state.lastKey = null;
      state.loading = false;
      state.error = null;
    },
    incrementPage: state => {
      state.page += 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNannies.pending, handlePending)
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.hasMore = action.payload.hasMore;
        state.lastKey = action.payload.lastKey || null;
        state.loading = false;

        let newItems = action.payload.nannies;

        if (state.sortBy === 'Show all') {
          const existingIds = new Set(state.items.map(item => item.id));
          const filtered = newItems.filter(item => !existingIds.has(item.id));
          state.items = [...state.items, ...filtered];
        } else {
          const sorted = applySorting(newItems, state.sortBy);
          const { paginated, hasMore, lastKey } = paginate(sorted, state.page);

          state.hasMore = hasMore;
          state.lastKey = lastKey;

          if (state.page === 1) {
            state.items = paginated;
          } else {
            const existingIds = new Set(state.items.map(item => item.id));
            const filtered = paginated.filter(
              item => !existingIds.has(item.id)
            );
            state.items = [...state.items, ...filtered];
          }
        }
      })
      .addCase(fetchNannies.rejected, handleRejected);
  },
});

export const { resetNannies, incrementPage, setSortBy } = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
