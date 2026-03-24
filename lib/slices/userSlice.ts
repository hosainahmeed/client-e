import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
}

interface UserState {
  isAuthenticated: boolean
  user?: User
  orders: Array<{
    id: string
    date: string
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
  }>
}

const initialState: UserState = {
  isAuthenticated: false,
  orders: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = undefined
      state.isAuthenticated = false
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    setOrders: (state, action: PayloadAction<UserState['orders']>) => {
      state.orders = action.payload
    },
    addOrder: (state, action: PayloadAction<UserState['orders'][0]>) => {
      state.orders.unshift(action.payload)
    },
  },
})

export const { setUser, logout, updateUser, setOrders, addOrder } = userSlice.actions

export default userSlice.reducer
