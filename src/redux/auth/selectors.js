export const selectUser = state => state.auth.user;
export const selectUserUid = state => state.auth.user?.uid;
export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectFavorites = state => state.auth.favorites;
export const selectUserIsLoading = state => state.auth.loading;
export const selectError = state => state.auth.error;
