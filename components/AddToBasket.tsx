"use client";

import useBasketStore from "@/app/store";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { Product } from "@/sanity.types";

interface AddToBasketProps {
  product: Product;
}

const AddToBasket = ({ product }: AddToBasketProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="flex justify-center items-center space-x-4">
      <button className="rounded-full p-1 bg-blue-500">
        <Minus
          className="text-white w-4 h-4"
          onClick={() => removeItem(product._id)}
        />
      </button>
      <p className="text-2xl">{itemCount}</p>
      <button className="rounded-full p-1 bg-blue-500">
        <Plus className="text-white w-4 h-4" onClick={() => addItem(product)} />
      </button>
      <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
        Add to Cart
      </Button>
    </div>
  );
};

export default AddToBasket;
