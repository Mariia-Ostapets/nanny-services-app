import { createSlice } from '@reduxjs/toolkit';
import {
  signUp,
  signIn,
  logOut,
  getCurrentUser,
  toggleFavorite,
  fetchFavorites,
} from './operations';
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
  user: {
    name: null,
    email: null,
    uid: null,
    token: null,
  },
  favorites: [],
  lastKey: null,
  hasMore: false,
  sortBy: 'Show all',
  page: 1,
  isLoggedIn: false,
  isRefreshing: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setSortByFavorites: (state, action) => {
      state.sortBy = action.payload;
      state.page = 1;
    },
    incrementFavoritesPage: state => {
      state.page += 1;
    },
    resetFavoritesPagination: state => {
      state.lastKey = null;
      state.hasMore = false;
      state.page = 1;
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(signUp.pending, handlePending)
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signUp.rejected, handleRejected)
      .addCase(signIn.pending, handlePending)
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.favorites = action.payload.favorites;
      })
      .addCase(signIn.rejected, handleRejected)
      .addCase(getCurrentUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.isRefreshing = false;
        if (action.payload) {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.favorites = action.payload.favorites;
        } else {
          state.user = { uid: null, name: '', email: '' };
          state.isLoggedIn = false;
          state.favorites = [];
        }
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, handlePending)
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;

        // const sorted = applySorting(state.favorites, state.sortBy);
        const sorted = applySorting(action.payload, state.sortBy);

        const { paginated, hasMore, lastKey } = paginate(sorted, state.page);

        if (state.page === 1) {
          state.favorites = paginated;
        } else {
          const existingIds = new Set(state.favorites.map(item => item.id));
          const filtered = paginated.filter(item => !existingIds.has(item.id));
          state.favorites = [...state.favorites, ...filtered];
        }

        state.hasMore = hasMore;
        state.lastKey = lastKey;
      })
      .addCase(fetchFavorites.rejected, handleRejected)
      .addCase(toggleFavorite.pending, handlePending)
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logOut.rejected, handleRejected),
});

export const {
  setSortByFavorites,
  incrementFavoritesPage,
  resetFavoritesPagination,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
