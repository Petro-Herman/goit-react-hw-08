// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// axios.defaults.baseURL = "https://connections-api.goit.global";

// export const api = axios.create({
//   baseURL: "https://connections-api.goit.global",
// });

// export const setAuthHeader = (token) => {
//   api.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   api.defaults.headers.common.Authorization = "";
// };

// export const register = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await api.post("/users/signup", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const login = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await api.post("/users/login", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const logOut = createAsyncThunk("auth/logout", async (_, thunkApi) => {
//   try {
//     await api.post("/users/logout");
//     clearAuthHeader();
//   } catch (error) {
//     return thunkApi.rejectWithValue(error.message);
//   }
// });

// export const refreshUser = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkApi) => {
//     const reduxState = thunkApi.getState();
//     setAuthHeader(reduxState.auth.token);
//     try {
//       const { data } = await api.get("users/current");
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   },
//   {
//     condition: (_, thunkApi) => {
//       const reduxState = thunkApi.getState();
//       return reduxState.auth.token !== null;
//     },
//   }
// );

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://connections-api.goit.global";

export const api = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeader = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  api.defaults.headers.common.Authorization = "";
};
// export const register = createAsyncThunk(
//   "auth/register",
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await api.post("/users/signup", credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await api.post("/users/login", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    await api.post("/users/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const reduxState = thunkApi.getState();
    setAuthHeader(reduxState.auth.token);
    try {
      const { data } = await api.get("/users/current");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const reduxState = thunkApi.getState();
      return reduxState.auth.token !== null;
    },
  }
);
