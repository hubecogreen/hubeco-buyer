import { createSlice,  PayloadAction } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: {}, // for user object
    token: "",
    refreshToken: "",
    otpToken:"",
    cartRedux: [],
    wishlistRedux: [],
    recentProducts: [],
    cartCount: 0,
    recentPurchaseTyes: [],
  },
  reducers: {
    // Reducer comes here

    setUser(state, action: PayloadAction<string>) {
      state.userInfo = action.payload;
    },

    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    
    saveOtpToken: (state, action: PayloadAction<string>) => {
      state.otpToken = action.payload;
    },
    saveRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    saveCart: (state, action: PayloadAction<any>) => {
      state.cartRedux = action.payload;
    },
    saveWishlist: (state, action: PayloadAction<any>) => {
      state.wishlistRedux = action.payload;
    },
    saveRecentProducts: (state, action: PayloadAction<any>) => {
      state.recentProducts = action.payload;
    },
    saveRecentPurchaseTypes: (state, action: PayloadAction<any>) => {
      state.recentPurchaseTyes = action.payload;
    },
    saveCartCount: (state, action: PayloadAction<any>) => {
      state.cartCount = action.payload;
    }
  },
});

export const { setUser, saveToken, saveRefreshToken , saveOtpToken,saveCart,saveWishlist,saveRecentProducts,saveCartCount,saveRecentPurchaseTypes} = userSlice.actions;
export default userSlice.reducer;
