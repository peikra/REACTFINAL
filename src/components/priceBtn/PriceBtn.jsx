import React from "react";
import "./priceBtn.css";
import bin from "../../assets/images/bin.png";
import { useBasket } from "../../context/basketLengthContext";
import { useState } from "react";
function PriceBtn({ data, setProductQuantity, productQuantity }) {
  const { productList, setProductList } = useBasket();

  const handleChange = (data, newValue) => {
    setProductQuantity((prevValue) => ({
      ...prevValue,
      [data.product]: Math.max(newValue, Number(data.second_quantity)),
    }));
  };
  const getMenuList = async () => {
    const sessionId = sessionStorage.getItem("session_id");
    try {
      const response = await fetch(
        "https://misho.pythonanywhere.com/api/order/cart/",
        {
          method: "GET",
          headers: {
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("cart_data", JSON.stringify(data));

      setProductList(data);
    } catch (error) {}
  };
  const removeProductFromBasket = async (element) => {
    const sessionId = sessionStorage.getItem("session_id");
    const removedProduct = {
      product: element.product,
    };
    try {
      const response = await fetch(
        `https://misho.pythonanywhere.com/api/order/remove-product/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(sessionId ? { "Session-ID": sessionId } : {}),
          },
          credentials: "include",
          body: JSON.stringify(removedProduct),
        }
      );
    } catch (error) {
      console.log(error);
    }

    getMenuList();
  };

  return (
    <div style={{ width: "100%", display: "flex" }}>
      {" "}
      <div className="priceBtn">
        <div className="basketCartBtn">
          <button
            onClick={() => {
              const newValue =
                (productQuantity[data.product] ?? Number(data.quantity)) -
                data.add_quantity;
              handleChange(data, Number(newValue.toFixed(2)));
            }}
          >
            -
          </button>

          <input
            type="number"
            value={productQuantity[data.product] ?? Number(data.quantity)}
            onChange={(e) => handleChange(data, Number(e.target.value))}
          />
          <button
            onClick={() => {
              const newValue =
                (productQuantity[data.product] ?? Number(data.quantity)) +
                data.add_quantity;
              handleChange(data, Number(newValue.toFixed(2)));
            }}
          >
            +
          </button>
        </div>
        <div className="priceSpan">
          <span>
            {(
              data.product_price *
              (productQuantity[data.product] ?? Number(data.quantity))
            ).toFixed(2)}
            ₾
          </span>
        </div>
        <div className="binIcon">
          <button onClick={() => removeProductFromBasket(data)}>
            <img src={bin} alt="bin" className="recycleBin" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PriceBtn;
