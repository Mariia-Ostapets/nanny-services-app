import { createSelector } from '@reduxjs/toolkit';

export const selectUser = state => state.auth.user;
// export const selectUserUid = state => state.auth.user?.uid;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectFavorites = state => state.auth.favorites;
// export const selectPaginatedFavorites = state => state.auth.paginatedFavorites;
export const selectFavoritesLastKey = state => state.auth.lastKey;
export const selectFavoritesHasMore = state => state.auth.hasMore;
export const selectFavoritesSortBy = state => state.auth.sortBy;
export const selectFavoritesPage = state => state.auth.page;
export const selectUserIsLoading = state => state.auth.loading;
export const selectError = state => state.auth.error;

export const selectFilteredFavorites = createSelector(
  [selectFavorites, selectFavoritesSortBy],
  (favorites, sortBy) => {
    if (!favorites || favorites.length === 0) return [];

    switch (sortBy) {
      case 'A to Z':
        return [...favorites].sort((a, b) => a.name.localeCompare(b.name));
      case 'Z to A':
        return [...favorites].sort((a, b) => b.name.localeCompare(a.name));
      case 'Popular':
        return [...favorites].sort((a, b) => a.rating - b.rating);
      case 'Not popular':
        return [...favorites].sort((a, b) => b.rating - a.rating);
      case 'Less than 10$':
        return favorites.filter(nanny => nanny.price_per_hour < 10);
      case 'Greater than 10$':
        return favorites.filter(nanny => nanny.rice_per_hour > 10);
      case 'Show all':
      default:
        return favorites;
    }
  }
);
