import { createContext, useContext } from "react";
import productStore from "./productStore";

const store = {
  productStore: productStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext<typeof store>(StoreContext);
};

export default store;
