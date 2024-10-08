"use client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : {}
    );
  };

  useEffect(() => {
    setCartToState();
  }, []);

  const addItemToCart = async ({
    product,
    title,
    price,
    image,
    stock,
    quantity = 1,
  }) => {
    const item = { product, title, price, image, stock, quantity };

    const isItemExist = cart?.cartItems?.find(
      (i) => i.product === item.product
    );
    let newCartItems;

    if (isItemExist) {
      newCartItems = cart?.cartItems?.map((i) =>
        i.product === isItemExist?.product
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
      toast.success("Added to cart");
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
      toast.success("Added to cart");
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart?.cartItems?.filter((i) => i.product !== id);

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };

  const saveOnCheckout = ({ amount, tax, totalAmount }) => {
    const checkoutInfo = {
      amount,
      tax,
      totalAmount,
    };

    const newCart = { ...cart, checkoutInfo };

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
    router.push("/shipping");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCart,
        deleteItemFromCart,
        saveOnCheckout,
        clearCart,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
