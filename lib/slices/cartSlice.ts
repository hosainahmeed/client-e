import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface CartState {
  items: CartItem[]
  totalPrice: number
  totalItems: number
  coupon?: {
    code: string
    discount: number
  }
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  totalItems: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id && 
        item.size === action.payload.size && 
        item.color === action.payload.color
      )
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
      
      cartSlice.caseReducers.updateTotals(state)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      cartSlice.caseReducers.updateTotals(state)
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity = action.payload.quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload.id)
        }
      }
      cartSlice.caseReducers.updateTotals(state)
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
      state.totalItems = 0
      state.coupon = undefined
    },
    applyCoupon: (state, action: PayloadAction<{ code: string; discount: number }>) => {
      state.coupon = action.payload
    },
    removeCoupon: (state) => {
      state.coupon = undefined
    },
    updateTotals: (state) => {
      state.totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
      let total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      if (state.coupon) {
        total = total * (1 - state.coupon.discount / 100)
      }
      state.totalPrice = Math.round(total * 100) / 100
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions

export default cartSlice.reducer
