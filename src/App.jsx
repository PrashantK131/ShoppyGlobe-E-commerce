import { Suspense, useState } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './components/NotFound';

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
