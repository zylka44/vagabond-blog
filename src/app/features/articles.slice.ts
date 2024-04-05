import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Article, NewArticle } from '../../shared/models/article.model';

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

export const getArticlesAction = createAsyncThunk<Article[]>('articles/getArticles', async () => {
  const data = await callApi<Article[]>('articles', 'GET');
  return data;
});

export const getArticleByIdAction = createAsyncThunk<Article, string>('articles/getArticle', async (id: string) => {
  const data = await callApi<Article>(`articles/${id}`, 'GET');
  return data;
});

export const addArticleAction = createAsyncThunk<Article, NewArticle>(
  'articles/addArticle',
  async (newArticle: NewArticle, { dispatch }) => {
    const data = await callApi<Article, NewArticle>('articles', 'POST', newArticle);
    dispatch(getArticlesAction());
    return data;
  }
);

export const updateArticleAction = createAsyncThunk<Article, Article>(
  'articles/updateArticle',
  async (article: Article) => {
    const id = article.id;
    const data = await callApi<Article, NewArticle>(`articles/${id}`, 'PATCH', article);
    return data;
  }
);

export const deleteArticleAction = createAsyncThunk<string, string>(
  'articles/deleteArticle',
  async (id: string, { dispatch }) => {
    await fetch(`${apiUrl}/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': 'application/json',
      },
    });
    dispatch(getArticlesAction());
    return id;
  }
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState: {} as { [key: string]: Article },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticlesAction.fulfilled, (state, action) => {
      action.payload.forEach((article) => {
        state[article.id] = article;
      });
    });

    builder.addCase(getArticleByIdAction.fulfilled, (state, action) => {
      const article = action.payload;
      state[article.id] = article;
    });

    builder.addCase(updateArticleAction.fulfilled, (state, action) => {
      const article = action.payload;
      state[article.id] = article;
    });

    builder.addCase(deleteArticleAction.fulfilled, (state, action) => {
      const id = action.payload;
      delete state[id];
    });
  },
});
