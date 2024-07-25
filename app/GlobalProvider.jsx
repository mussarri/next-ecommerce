import React from "react";
import { CartProvider } from "../context/CartContext";

export const GlobalProvider = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};
 