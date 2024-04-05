import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TripType } from '../../shared/models/article.model';

const apiUrl = 'http://localhost:3001';

const callApi = async <T, D = {}>(path: string, method: 'POST' | 'GET' | 'PATCH', payload?: D): Promise<T> => {
  const res = await fetch(`${apiUrl}/${path}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data: T = await res.json();
  return data;
};

export const filterArticlesAction = createAsyncThunk<
  string[],
  { filteringText: string; selectedTripTypes: TripType[] }
>('filteredArticles/filter', async (a: { filteringText: string; selectedTripTypes: TripType[] }) => {
  const data = await callApi<string[], { filteringText: string; selectedTripTypes: TripType[] }>(
    'filteredArticles',
    'PATCH',
    a
  );
  return data;
});

export const filteredArticlesSlice = createSlice({
  name: 'articles',
  initialState: { ids: [] } as { ids: string[] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(filterArticlesAction.fulfilled, (state, action) => {
      state.ids = action.payload;
    });
  },
});
