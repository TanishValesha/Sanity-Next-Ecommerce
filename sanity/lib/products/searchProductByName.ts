import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { getAllProducts } from "./getAllProducts";

export const searchProductByName = async (searchParams: string) => {
  if (searchParams == "") return await getAllProducts();
  const SEARCH_PRODUCT = defineQuery(
    `*[_type == "product" && name match $searchParams] | order(name asc)`
  );

  try {
    const product = await sanityFetch({
      query: SEARCH_PRODUCT,
      params: { searchParams },
    });

    return product.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
