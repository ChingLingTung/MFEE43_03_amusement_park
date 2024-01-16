import { useContext } from "react";
import CartsContext from "@/contexts/CartsContext";

// 要搭配 SDCartsContext 使用

export default function useCart(cartId = "cart0") {
  const { Carts, CartsDispach } = useContext(CartsContext);

  const addItem = (item = {}) => {
    CartsDispach({
      type: "ADD_ITEM",
      payload: { ...item, cartId },
    });
  };

  const removeItem = (item = {}) => {
    CartsDispach({
      type: "REMOVE_ITEM",
      payload: { ...item, cartId },
    });
  };

  const changeQuantity = (item = {}) => {
    CartsDispach({
      type: "CHANGE_QUANTITY",
      payload: { ...item, cartId },
    });
  };

  const increase = (item = {}) => {
    CartsDispach({
      type: "INCREASE",
      payload: { ...item, cartId },
    });
  };

  const decrease = (item = {}) => {
    CartsDispach({
      type: "DECREASE",
      payload: { ...item, cartId },
    });
  };

  const clear = () => {
    CartsDispach({
      type: "CLEAR",
      payload: { cartId },
    });
  };

  return {
    cart: Carts[cartId],
    addItem,
    removeItem,
    changeQuantity,
    increase,
    decrease,
    clear,
  };
}
