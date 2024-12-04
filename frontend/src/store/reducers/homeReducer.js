import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_categories = createAsyncThunk(
  "home/get_categories",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("/home/get-categories");
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // get_categories End Method
export const get_products = createAsyncThunk(
  "home/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await api.get("/home/get-products");
      return fulfillWithValue(response.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
); // get_products End Method

export const product_details = createAsyncThunk(
  "home/product_details",
  async (slug, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/product-details/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// End Method
export const price_range_product = createAsyncThunk(
  "home/price_range_product",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/home/price-range-product`);
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const query_proudcts = createAsyncThunk(
  "home/price_range_product",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(query);
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const homeReducer = createSlice({
  name: "home",
  initialState: {
    errorMessage: "",
    categories: [],
    products: [],
    latest_product: [],
    topRated_product: [],
    discounted_product: [],
    product: {},
    relatedProducts: [],
    moreProducts: [],
    priceRange: {
      low: 0,
      high: 100,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_categories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(get_categories.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(get_products.rejected, (state, action) => {
        state.errorMessage = action.payload.error;
      })
      .addCase(get_products.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.latest_product = action.payload.latest_product;
        state.topRated_product = action.payload.topRated_product;
        state.discounted_product = action.payload.discounted_product;
      })
      .addCase(product_details.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.moreProducts = payload.moreProducts;
      })
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.priceRange = payload.priceRange;
        state.latest_product = payload.latest_product;
      });
  },
});

export default homeReducer.reducer;
