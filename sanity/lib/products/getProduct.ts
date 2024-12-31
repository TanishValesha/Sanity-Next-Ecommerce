import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProduct = async (slug: string) => {
  const GET_PRODUCT = defineQuery(
    `*[_type == "product" && slug.current == $slug] `
  );

  try {
    const product = await sanityFetch({
      query: GET_PRODUCT,
      params: { slug },
    });
    console.log(product.data);

    return product.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
