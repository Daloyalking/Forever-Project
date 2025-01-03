import axios from "axios";
import { createContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [size, setSize] = useState("");
  const [cartItems, setCartItems] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, setToken] = useState("");

  const [loginOp, setLoginOp] = useState(true);
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [errorSign, setErrorSign] = useState({
    incorrectEmail: false,
    userExist: false,
    shortPassword: false,
  });
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = "https://forever-backend-flame.vercel.app";
  let navigate = useNavigate();

  const loginFunction = async () => {
    try {
      const { name, email, password } = loginInfo;
      if (loginOp) {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setLoginInfo({ name: "", email: "", password: "" });
        } else {
          setIncorrectLogin(true);
          console.log("Error occur while logging in");
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/signup", {
          name,
          email,
          password,
        });
        console.log(response);
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setLoginInfo({ name: "", email: "", password: "" });
        } else {
          switch (response.data.message) {
            case "Email is incorrect":
              setErrorSign((prev) => ({
                ...prev,
                incorrectEmail: true,
                userExist: false,
                shortPassword: false,
              }));
              break;
            case "User already exist":
              setErrorSign((prev) => ({
                ...prev,
                userExist: true,
                incorrectEmail: false,
                shortPassword: false,
              }));
              break;
            case "Password is too short":
              setErrorSign((prev) => ({
                ...prev,
                userExist: false,
                incorrectEmail: false,
                shortPassword: true,
              }));
              break;
            default:
              console.log("Brutal Error Occur");
              break;
          }
          console.log("Error occur while logging in");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/allproducts");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        console.log("Error loading the product");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Category Section
  const toggleCategories = (e) => {
    if (categories.includes(e.target.value)) {
      setCategories((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategories((item) => [...item, e.target.value]);
    }
  };

  //Sub Category Section
  const togglesubCategories = (e) => {
    if (subCategories.includes(e.target.value)) {
      setSubCategories((prev) =>
        prev.filter((item) => item !== e.target.value)
      );
    } else {
      setSubCategories((prev) => [...prev, e.target.value]);
    }
  };

  //CartItems Section
  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);
    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    setSize("");
    toast.success("Item Added to Cart");
    //Adding cart data to database
    if (token) {
      try {
        const result = await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  //Adding Cart Items Section
  const cartTotalCount = () => {
    let totalCount = 0;

    let cartData = structuredClone(cartItems);

    for (const itemId in cartData) {
      for (const size in cartData[itemId]) {
        if (cartData[itemId][size] > 0) {
          totalCount += cartData[itemId][size];
        }
      }
    }
    return totalCount;
  };

  //Deleting a Cart Item

  const deleteCartItem = async (itemId, size) => {
    const cartData = structuredClone(cartItems);
    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
    }

    // Remove the item if no sizes remain
    if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
      delete cartData[itemId];
    }
    setCartItems(cartData);
    toast.success("Item Deleted Successfully");
    if (token) {
      try {
        const result = await axios.post(
          backendUrl + "/api/cart/delete",
          { itemId, size },
          {
            headers: { token },
          }
        );
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        const result = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getDataItems = async (token) => {
    try {
      const result = await axios.get(backendUrl + "/api/cart/get", {
        headers: { token },
      });
      if (result.data.success) {
        setCartItems(result.data.cartData);
      } else {
        return result.json({
          success: false,
          message: "Error occur while updating the cart",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let cartData = structuredClone(cartItems);

    let totalP = 0;

    const totalProductPrice = (products) => {
      for (let itemId in cartData) {
        const productPrice = products?.find((item) => item._id === itemId);
        console.log(products);

        for (let size in cartData[itemId]) {
          if (cartData[itemId][size] > 0) {
            totalP += productPrice?.price * Number(cartData[itemId][size]);
          }
        }
      }
      console.log(totalP);
      setTotalPrice(Number(totalP));
    };

    totalProductPrice(products);
  }, [cartItems, products]);

  useEffect(() => {
    fetchProducts();
    console.log(products);
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getDataItems(localStorage.getItem("token"));
    }
  }, [loginFunction]);

  const value = {
    products,
    currency,
    delivery_fee,
    showFilter,
    setShowFilter,
    categories,
    setCategories,
    subCategories,
    setSubCategories,
    toggleCategories,
    togglesubCategories,
    openSearch,
    setOpenSearch,
    searchText,
    setSearchText,
    addToCart,
    size,
    setSize,
    cartTotalCount,
    cartItems,
    setCartItems,
    deleteCartItem,
    updateQuantity,
    totalPrice,
    navigate,
    token,
    setToken,
    backendUrl,
    loginOp,
    setLoginOp,
    incorrectLogin,
    setIncorrectLogin,
    errorSign,
    setErrorSign,
    loginInfo,
    setLoginInfo,
    loginFunction,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
