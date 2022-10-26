import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseStock, StockNews } from "typings/typings";

const BASE_URL: string = "https://financialmodelingprep.com/api/v3";

interface UserState {
  news: StockNews[];
  info: BaseStock[];
  status: "loading" | "completed" | "failed";
  error: string | undefined;
}

const initialState: UserState = {
  news: [],
  info: [],
  status: "loading",
  error: "",
};

export const fetchNews = createAsyncThunk(
  "stocks/fetchNews",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/stock_news?limit=50&apikey=64b9cb7bc28bb75e48c2508d805275c9`
      );
      return [...response.data];
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue("An error occured");
    }
  }
);

/**
 * @returns Company Details on a stock
 */
export const fetchCompanyDetails = createAsyncThunk(
  "stock/fetchCompanyDetails",
  async (companyName: string, thunkApi) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/profile/${companyName}?apikey=64b9cb7bc28bb75e48c2508d805275c9`
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Something went wrong :(");
    }
  }
);

/**
 * @returns Company Details on a stock
 */
export const fetchCompanyNews = createAsyncThunk(
  "stock/fetchCompanyNews",
  async (companyName: string, thunkApi) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/stock_news?tickers=${companyName}&limit=10&apikey=64b9cb7bc28bb75e48c2508d805275c9`
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Something went wrong :(");
    }
  }
);

/**
 * @returns Company Details on a stock
 */
export const fetchSectorNews = createAsyncThunk(
  "stock/fetchSectorNews",
  async (_, thunkApi) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/stock_news?limit=10&apikey=64b9cb7bc28bb75e48c2508d805275c9`
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue("Something went wrong :(");
    }
  }
);

export const stockSlice = createSlice({
  name: "stocks",
  initialState,
  reducers: {
    fetchStockNews: (state, action: PayloadAction<string[]>) => {
      return { ...state, stockNews: action.payload };
    },
    searchStock: (_, action: PayloadAction) => {
      return action.payload;
    },
    fetchStock: (state, action: PayloadAction<string[]>) => {
      return { ...state, stockInfo: action.payload };
    },
    fetchStockNewsInfo: (state, action: PayloadAction<string[]>) => {
      return { ...state, stockNews: action.payload };
    },
    fetchSectorNewsInfo: (state, action: PayloadAction<string[]>) => {
      return { ...state, stockNews: action.payload };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "completed";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.status = "completed";
        state.info = action.payload;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCompanyNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCompanyNews.fulfilled, (state, action) => {
        state.status = "completed";
        state.info = action.payload;
      })
      .addCase(fetchCompanyNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // sector news
      .addCase(fetchSectorNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSectorNews.fulfilled, (state, action) => {
        state.status = "completed";
        state.info = action.payload;
      })
      .addCase(fetchSectorNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  fetchStockNews,
  fetchStockNewsInfo,
  fetchStock,
  fetchSectorNewsInfo,
} = stockSlice.actions;
export default stockSlice.reducer;
