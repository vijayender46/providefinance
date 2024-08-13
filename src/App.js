import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Layout  from "./Layout";
import Products from "./Products";
import Checkout from "./Checkout";
import ProductsDetail from './ProductsDetail';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="product-details/:id" element={<ProductsDetail />} />
              <Route path="checkout" element={<Checkout />} />
          </Route>
      </Routes>
  );
}

export default App;