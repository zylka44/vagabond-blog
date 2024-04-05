import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

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

export const getSessionAction = createAsyncThunk<boolean>('session/getSession', async () => {
  const data = await callApi<boolean>('session', 'GET');
  return data;
});

export const setCresentialsFromLocalStorageAction = createAsyncThunk(
  'session/setCredentialsFromLocalStorage',
  async () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
);

export const validateCredentialAction = createAsyncThunk<boolean, { password: string }>(
  'session/validateCredential',
  async (credentials: { password: string }) => {
    const data = await callApi<boolean, { password: string }>('session', 'POST', credentials);
    return data;
  }
);

export const logoutAction = createAsyncThunk('session/logout', () => true);

export const sessionSlice = createSlice({
  name: 'session',
  initialState: { isLoggedIn: false } as { isLoggedIn: boolean },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setCresentialsFromLocalStorageAction.fulfilled, (state, action) => {
      const isLoggedInAsString = action.payload ? 'true' : 'false';
      localStorage.setItem('isLoggedIn', isLoggedInAsString);
      state.isLoggedIn = action.payload;
    });
    builder.addCase(validateCredentialAction.fulfilled, (state, action) => {
      const isLoggedInAsString = action.payload ? 'true' : 'false';
      localStorage.setItem('isLoggedIn', isLoggedInAsString);
      state.isLoggedIn = action.payload;
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      localStorage.setItem('isLoggedIn', 'false');
      state.isLoggedIn = false;
    });
  },
});
