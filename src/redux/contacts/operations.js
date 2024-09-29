import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, api } from "../auth/operations";

export const fetchContacts = createAsyncThunk(
  "contacts/getContact",
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const token = state.auth.token;
    if (!token) {
      throw new Error("No authentication token available");
    }
    setAuthHeader(token);
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token available");
      }
      setAuthHeader(token);
      const response = await api.post("/contacts", newContact);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactID, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token available");
      }
      setAuthHeader(token);
      const response = await api.delete(`/contacts/${contactID}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
