import { CategorySelector } from "@/components/CategorySelector";
import { ProductCard } from "@/components/ProductCard";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";
import React from "react";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  console.log(products);
  return (
    <div className="flex flex-col gap-6">
      <CategorySelector categories={categories} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              title={product.name || "No Title"}
              price={product.price || 0}
              image={product.image?.asset?._ref || ""}
              slug={product.slug?.current || ""}
              category={
                product.category?.map((cat) => cat._ref).join(", ") ||
                "No Category"
              }
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;
