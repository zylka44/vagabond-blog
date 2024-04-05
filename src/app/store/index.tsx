import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from '../features/session.slice';
import { articlesSlice } from '../features/articles.slice';
import { filteredArticlesSlice } from '../features/filteredArticles.slice';
import { loadingSlice } from '../features/loading.slice';
import { modalsSlice } from '../features/modals.slice';

const store = configureStore({
  reducer: {
    session: sessionSlice.reducer,
    articles: articlesSlice.reducer,
    filteredArticles: filteredArticlesSlice.reducer,
    loading: loadingSlice.reducer,
    modals: modalsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
