import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubscriptionContent = createAsyncThunk(
  "/subscriptions/content",
  async () => {
    const response = await axios.get("/api/users?page=2", {});
    return response.data;
  }
);

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: {
    isLoading: false,
    subscriptions: [],
  },
  reducers: {
    addNewSubscription: (state, action) => {
      let { newSubscriptionObj } = action.payload;
      state.subscriptions = [...state.subscriptions, newSubscriptionObj];
    },

    deleteSubscription: (state, action) => {
      let { index } = action.payload;
      state.subscriptions.splice(index, 1);
    },
  },

  extraReducers: {
    [getSubscriptionContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getSubscriptionContent.fulfilled]: (state, action) => {
      state.subscriptions = action.payload.data;
      state.isLoading = false;
    },
    [getSubscriptionContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewSubscription, deleteSubscription } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;
