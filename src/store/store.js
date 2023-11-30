import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import cartSlice from './cart/cartSlice';

const store = configureStore({
	reducer: {
		user: userSlice,
		cart: cartSlice,
	},
});

export default store;
