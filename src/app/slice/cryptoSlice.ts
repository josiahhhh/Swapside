import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL: string = "http://localhost:3000/api";

interface State {
  currencies: string[];
  order: any;
  status: "loading" | "completed" | "failed";
  error: string | undefined;
}

const initialState: State = {
  currencies: [],
  order: {},
  status: "loading",
  error: "",
};

export const fetchCurrencies = createAsyncThunk(
  "cryptocurrencies/fetchCurrencies",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/currencies`);
      return [...response.data];
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue("An error occured");
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "cryptocurrencies/fetchOrder",
  async (id: string, thunkApi) => {
    try {
      const response = await axios.get(`${BASE_URL}/order?id=${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue("An error occured");
    }
  }
);

export const cryptoSlice = createSlice({
  name: "cryptocurrencies",
  initialState,
  reducers: {
    fetchCryptoCurrencies: (state, action: PayloadAction<string[]>) => {
      return { ...state, currencies: action.payload };
    },
    fetchOrder: (state, action: PayloadAction<any>) => {
      return { ...state, order: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.status = "completed";
        state.currencies = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.status = "completed";
        state.order = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.status = "failed";
        state.order = action.error.message;
      });
  },
});

export const { fetchCryptoCurrencies } = cryptoSlice.actions;
export default cryptoSlice.reducer;
