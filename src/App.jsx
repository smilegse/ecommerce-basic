import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import VerifyLoginPage from './pages/VerifyLoginPage';
import CartListPage from './pages/CartListPage';
import ProductListPage from './pages/ProductListPage';
// import PageNotFound from "./pages/PageNotFound";

function App() {

  if(isLogin()){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListPage/>} />
          <Route path="/cart-list" element={<CartListPage/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    );
  }else{
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/verify" element={<VerifyLoginPage/>} />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
}

export default App
