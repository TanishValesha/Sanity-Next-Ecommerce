"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Star, Truck } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: number;
  description: string;
  rating: number;
  reviews: number;
  category: string;
}

export function ProductInfo({
  title,
  price,
  description,
  rating,
  reviews,
  category,
}: ProductCardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{category}</p>
        <div className="mt-4 flex items-center space-x-4">
          <span className="text-2xl font-bold">${price}</span>
          <Badge variant="outline" className="text-sm">
            Free Shipping
          </Badge>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-muted-foreground">
          ({reviews} reviews)
        </span>
      </div>

      {/* {product.colors && (
        <div className="space-y-4">
          <h3 className="font-semibold">Color</h3>
          <div className="flex space-x-4">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md ${
                  selectedColor === color
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )} */}

      <div className="space-y-4">
        <h3 className="font-semibold">Description</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      {/* {product.features && (
        <div className="space-y-4">
          <h3 className="font-semibold">Key Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-center">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className="space-y-4 pt-4">
        <Button size="lg" className="w-full bg-blue-500 hover:bg-blue-600">
          Add to Cart
        </Button>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Truck className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Free Delivery</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              2 Year Warranty
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
