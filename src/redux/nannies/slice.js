import { createSlice } from '@reduxjs/toolkit';
import { getNannies } from './operations';

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  console.error('SIGN IN REJECTED:', action.payload);
  state.loading = false;
  state.error = action.payload;
};

const INITIAL_STATE = {
  items: [],
  page: 1,
  hasMore: false,
  filter: 'Show all',
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getNannies.pending, handlePending)
      .addCase(getNannies.fulfilled, (state, action) => {
        state.hasMore = action.payload.hasMore;
        state.lastKey = action.payload.lastKey || null;
        state.loading = false;

        const newItems = action.payload.nannies.filter(
          ({ id }) => !state.items.some(existing => existing.id === id)
        );

        if (newItems.length) {
          state.items.push(...newItems);
        }
      })
      .addCase(getNannies.rejected, handleRejected);
  },
});

export const { resetNannies, incrementPage, setFilter } = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
