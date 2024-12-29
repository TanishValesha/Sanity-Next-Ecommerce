import { imageURL } from "@/lib/imageURL";
import { Product } from "@/sanity.types";
import Image from "next/image";
import React from "react";

interface ProductsProps {
  products: Product[];
}

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 p-4">
        <h1 className="text-4xl font-bold">Products</h1>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4">
            {product.image && (
              <Image
                src={imageURL(product.image).url() as string}
                alt="Product Image"
                width={200}
                height={200}
                className="rounded"
              />
            )}
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-lg">
              {product.description
                ?.map((block) =>
                  block._type === "block"
                    ? block.children?.map((child) => child.text).join("")
                    : ""
                )
                .join(" ") || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
