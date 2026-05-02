import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

// Router using createBrowserRouter (data router API — better features and data handling)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <ProductDetail /> }, // Dynamic route param
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: '*', element: <NotFound /> }, // 404 catch-all
    ],
  },
]);

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
