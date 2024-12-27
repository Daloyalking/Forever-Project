import react, { useContext } from "react";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "./Pages/Product";
import Footer from "./Components/Footer";
import Search from "./Components/Search";
import { ShopContext } from "./Context/ShopContext";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Payment from "./Pages/Payment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { openSearch } = useContext(ShopContext);
  const location = useLocation();

  const isCollectionPath = location.pathname.includes("collection");
  return (
    <div className="m-0 p-0">
    <ToastContainer/>
      <NavBar />

      {openSearch && isCollectionPath ? <Search /> : ""}

      <div className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
