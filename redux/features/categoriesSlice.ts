import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Category } from "@/types/category";
import { fetchCategoriesAPI } from "@/services/categoryService";

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchCategoriesAPI();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoriesSlice.reducer;
