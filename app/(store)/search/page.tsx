import { ProductCard } from "@/components/ProductCard";
import { searchProductByName } from "@/sanity/lib/products/searchProductByName";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const products = await searchProductByName(query);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products &&
        products.map((product) => (
          <ProductCard
            key={product._id}
            title={product.name || "No Title"}
            price={product.price || 0}
            image={product.image?.asset?._ref || ""}
            category={
              product.category?.map((cat) => cat._ref).join(", ") ||
              "No Category"
            }
          />
        ))}
    </div>
  );
};

export default SearchPage;
