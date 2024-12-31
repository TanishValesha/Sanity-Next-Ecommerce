import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
  const GET_PRODUCTS_BY_CATEGORY = defineQuery(
    `*[_type == "product" && category[0]->slug.current == $categorySlug] | order(name asc)`
  );

  try {
    const product = await sanityFetch({
      query: GET_PRODUCTS_BY_CATEGORY,
      params: { categorySlug },
    });
    console.log(product.data);

    return product.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// *[_type == "product" && reference(*[_type == "category" && slug.current == $slug]._id)] | order(name asc)
