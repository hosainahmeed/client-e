import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@/lib/slices/cartSlice'
import productsReducer from '@/lib/slices/productsSlice'
import userReducer from '@/lib/slices/userSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
