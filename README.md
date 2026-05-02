# ShoppyGlobe 🛍️

> A modern, fully responsive e-commerce application named ShoppyGlobe built with React + Vite. It allows user to shop and order products by searching, viewing details, selecting, adding or removing the product from the cart according to there choice.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|---|
| **React** | UI library |
| **Vite** | Build tool and dev server |
| **React Router DOM** | Client-side routing |
| **Redux Toolkit** | State management |
| **React Redux** | React bindings for Redux |
| **Tailwind CSS** | Utility-first styling |
| **Prop Types** | Runtime prop validation |
| **DummyJSON API** | Mock product data |

### Core Features
- ✅ Product listing with grid layout
- ✅ Product detail page with image gallery
- ✅ Add to cart from product list and detail page
- ✅ Shopping cart with quantity controls
- ✅ Remove items from cart
- ✅ Real-time product search using Redux state
- ✅ Checkout form with full input validation
- ✅ Order confirmation modal before placing order
- ✅ Order success screen with personalized message
- ✅ 404 Not Found page with error details

### Technical Features
- ✅ Custom hook `useProducts` for API data fetching
- ✅ Redux Toolkit for cart and search state management
- ✅ `createBrowserRouter` (React Router data API)
- ✅ Code splitting with `React.lazy` + `Suspense`
- ✅ Lazy image loading with `IntersectionObserver`
- ✅ Cart persisted to `localStorage`
- ✅ Error handling for failed API requests
- ✅ Fully responsive — mobile, tablet and desktop

## 📁 Project Structure

```
shoppyglobe/
│
├── index.html                  # App entry HTML
├── vite.config.js              # Vite + Tailwind configuration
├── package.json                # Dependencies and scripts
├── README.md                   # Project documentation
│
└── src/
    │
    ├── main.jsx                # ReactDOM entry — Redux Provider
    ├── App.jsx                 # Root component — Router + Lazy loading
    ├── index.css               # Tailwind v4 import + global CSS variables
    |
    │   
    │
    ├── store/
    │   ├── index.js            # Redux store config + localStorage subscriber
    │   ├── cartSlice.js        # Cart actions, reducers, selectors + localStorage helpers
    │   └── searchSlice.js      # Search query actions and selectors
    │
    ├── hooks/
    │   └── useProducts.js      # Custom hook — fetches products from DummyJSON API
    │
    ├── components/
    │   ├── Header.jsx          # Navigation bar, search input, cart icon
    │   ├── ProductList.jsx     # Product grid filtered by Redux search state
    │   ├── ProductItem.jsx     # Single product card with Add to Cart button
    │   ├── CartItem.jsx        # Single cart row with quantity controls
    │   ├── LazyImage.jsx       # Image with IntersectionObserver lazy loading
    │   └── NotFound.jsx        # 404 page with error details
    │
    └── pages/
        ├── Home.jsx            # Home page — renders ProductList
        ├── ProductDetail.jsx   # Product detail — fetches by route :id param
        ├── Cart.jsx            # Cart page — renders CartItem list
        └── Checkout.jsx        # Checkout form with validation + confirmation modal
```

## 🌐 API Reference

This project uses the free **DummyJSON API** for product data.

| Endpoint | Method | Description |
|---|---|---|
| `https://dummyjson.com/products?limit=30` | GET | Fetch list of 30 products |
| `https://dummyjson.com/products/:id` | GET | Fetch single product by ID |

### 📝 How to Run
    - Clone or download the project files.
    - Install node modules i.e. "npm install"
    - Run "npm run dev".

## 📌 Implementation Details 
    - Code is thoroughly commented to explain complex logics.
    - Github Link: [https://github.com/PrashantK131/ShoppyGlobe-E-commerce]

## 👨‍💻 Author

[Prashant Kumar]