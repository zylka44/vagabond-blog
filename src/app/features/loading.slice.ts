import { createSlice } from '@reduxjs/toolkit';
import { getArticlesAction } from './articles.slice';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: true,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesAction.pending, () => true);
    builder.addCase(getArticlesAction.fulfilled, () => false);
    builder.addCase(getArticlesAction.rejected, () => false);
  },
});

export const selectLoading = (state: any) => state.loading;
