import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ModalConfig, ModalType } from '../../shared/models/article.model';

export const setModalTypeAction = createAsyncThunk('modals/setModalType', (modalType: ModalType) => {
  return modalType;
});

export const setModalConfigAction = createAsyncThunk('modals/setModalConfig', (modalConfig: ModalConfig) => {
  return modalConfig;
});

export const closeModalAction = createAsyncThunk('modals/closeModal', () => {
  return null;
});

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: { modalType: null, modalConfig: null } as {
    modalType: ModalType | null;
    modalConfig: ModalConfig | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setModalTypeAction.fulfilled, (state, action) => {
      state.modalType = action.payload;
    });
    builder.addCase(setModalConfigAction.fulfilled, (state, action) => {
      state.modalConfig = action.payload;
    });
    builder.addCase(closeModalAction.fulfilled, (state, action) => {
      state.modalType = null;
    });
  },
});

export const selectModals = (state: any) => state.modals;
