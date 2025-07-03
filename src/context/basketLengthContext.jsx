import { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
  const [productList, setProductList] = useState(() => {
    const saved = sessionStorage.getItem("basket_data");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    if (productList) {
      sessionStorage.setItem("basket_data", JSON.stringify(productList));
    }
  }, [productList]);
  return (
    <BasketContext.Provider value={{ productList, setProductList }}>
      {children}
    </BasketContext.Provider>
  );
};
