import Products from "@/components/Products";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import React from "react";

const Home = async () => {
  const products = await getAllProducts();

  return (
    <div>
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <Products products={products} />
      </div>
    </div>
  );
};

export default Home;
