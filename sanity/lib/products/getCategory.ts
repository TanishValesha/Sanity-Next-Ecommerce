import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getCategory = async (_ref: string) => {
  const GET_CATEGORY = defineQuery(`*[_type == "category" && _id == "${_ref}"] {
        title
      }`);

  try {
    const category = await sanityFetch({
      query: GET_CATEGORY,
    });

    return category.data[0].title || "";
  } catch (error) {
    console.error(error);
    return "";
  }
};
