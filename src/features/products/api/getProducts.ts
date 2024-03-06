import { useQuery } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { ExtractFnReturnType } from "@/lib/react-query";

import { ProductListResponse } from "../types";
import { getCategories, useCategories } from "./getCategories";
import { getProductStock } from "./getProductStock";

export const getProducts = (): Promise<ProductListResponse> => {
  return axios.get(`/product`);
};

type QueryFnType = typeof getProducts;

export const useProducts = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ["products"],
    queryFn: async () => {
      const productsResponse = await getProducts();
      const categoriesResponse = await getCategories();
      const productStockResponse = await getProductStock();

      return Promise.all(
        productsResponse.data.map(async (product) => {
          return {
            ...product,
            stock: productStockResponse.data.find(
              (value) => value.id === product.id
            )?.stock,
            categories: product.categories.map((categoryId) => {
              const matchedCategory = categoriesResponse.data.find(
                (cat) => cat.id === categoryId
              )?.name;
              return {
                id: categoryId,
                name: matchedCategory,
              };
            }),
          };
        })
      );
    },
  });
};
