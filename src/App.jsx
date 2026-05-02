import { lazy, Suspense, useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/Header';

// Lazy-loaded page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

// Root layout — wraps all pages with Header
const RootLayout = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(selectSearchQuery);

  const handleSearchChange = (value) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <>
      <Header onSearchChange={handleSearchChange} searchValue={searchValue} />
      {/* Suspense wraps all lazy-loaded routes */}
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

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
