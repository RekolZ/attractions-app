import { getAttractions } from "../src/api/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AttractionsState {
  items: Attraction[];
  loading: boolean;
  error: string | null;
}

export interface Attraction {
    id: string;
    name: string;
    description: string;
    rating: string;
    createdAt: string;
    image: string;
    location: string;
    coordinates: string;
    status: 'В планах' | 'Осмотрена';
}

const initialState: AttractionsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchAttractions = createAsyncThunk(
  "items/fetchAttractions",
  async () => {
    const data = await getAttractions();
    return data;
  }
);

const attrationsSlice = createSlice({
  name: "attrations",
  initialState,
  reducers: {
    createAttration: (state, action: PayloadAction<Attraction>) => {
      state.items = [action.payload, ...state.items];
    },
    editAttration: (state, action: PayloadAction<Attraction>) => {
      state.items = state.items.map((obj) =>
        obj.id === action.payload.id ? action.payload : obj
      );
    },
    deleteAttration: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttractions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAttractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке данных";
      });
  },
});

export const { deleteAttration, createAttration, editAttration } =
  attrationsSlice.actions;

export default attrationsSlice.reducer;
