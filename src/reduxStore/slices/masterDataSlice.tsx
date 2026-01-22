import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const masterDataSlice = createSlice({
  name: "masterData",
  initialState: {
    countries: [], // for user object
    states: [],
    cities: [],
    // for storing the JWT
    services: [],
    categories:[],
    buildingSystemCategories:[],
    catetime:0
  },
  reducers: {
    // Reducer comes here

    saveCountries: (state, action: PayloadAction<any>) => {
      state.countries = action.payload;
    },

    saveStates: (state, action: PayloadAction<any>) => {
      state.states = action.payload;
    },
    saveCities: (state, action: PayloadAction<any>) => {
      state.cities = action.payload;
    },
    saveServices: (state, action: PayloadAction<any>) => {
      state.services = action.payload;
    },
    saveCategories: (state, action: PayloadAction<any>) => {
      state.categories = action.payload;
    },
    saveCatTime: (state, action: PayloadAction<any>) => {
      state.catetime = action.payload;
    },
    saveBuildingSystemCategories: (state, action: PayloadAction<any>) => {
      state.buildingSystemCategories = action.payload;
    }
  },
});

export const { saveCountries, saveStates, saveCities, saveServices, saveCategories, saveCatTime,saveBuildingSystemCategories } =
  masterDataSlice.actions;
export default masterDataSlice.reducer;
