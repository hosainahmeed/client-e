'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { logout, updateUser } from '@/lib/slices/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, orders } = useAppSelector(state => state.user)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(user || {})

  if (!isAuthenticated || !user) {
    return (
      <>
        <main className="min-h-screen bg-background py-16">
          <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-3xl font-semibold text-foreground mb-4">Not Signed In</h1>
            <p className="text-muted-foreground mb-8">Please sign in to view your profile</p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
          </div>
        </main>

      </>
    )
  }

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  const handleSaveProfile = () => {
    dispatch(updateUser(editData))
    setIsEditing(false)
  }

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-3xl md:text-4xl font-semibold text-foreground">My Account</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-lg p-6 bg-card sticky top-24">
                <h3 className="font-semibold text-lg text-foreground mb-4">Menu</h3>
                <nav className="space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground">
                    Orders
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground">
                    Addresses
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors text-foreground">
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-destructive/10 transition-colors text-destructive"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile Section */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground mb-1">Profile Information</h2>
                    <p className="text-sm text-muted-foreground">Manage your account details</p>
                  </div>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={editData?.name || ''}
                          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={editData?.email || ''}
                          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        value={editData?.phone || ''}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        className="px-8 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-8 py-2 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-6 pb-4 border-b border-border">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-2xl">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Account Name</p>
                        <p className="font-semibold text-foreground text-lg">{user.name}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{user.email}</p>
                    </div>

                    {user.phone && (
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium text-foreground">{user.phone}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Orders Section */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Recent Orders</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">No orders yet</p>
                    <Link
                      href="/products"
                      className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="py-4 flex items-center justify-between">
                        <div>
                          <p className="font-mono font-semibold text-foreground">{order.id}</p>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">${order.total.toFixed(2)}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order.status === 'pending'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'processing'
                              ? 'bg-yellow-100 text-yellow-800'
                              : order.status === 'shipped'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
