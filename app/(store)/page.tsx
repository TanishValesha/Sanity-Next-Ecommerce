import { ProductCard } from "@/components/ProductCard";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import React from "react";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
    </main>
  );
};

export default Home;
