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

// Page loading fallback spinner
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex gap-2">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-3 h-3 rounded-full"
          style={{
            background: 'var(--color-clay)',
            animation: `pulse 1s ${i * 0.2}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  </div>
);

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
