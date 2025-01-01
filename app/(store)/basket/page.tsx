// "use client";

// import useBasketStore from "@/app/store";
// import { useAuth, useUser } from "@clerk/nextjs";
// import { useRouter } from "next/router";
// import React, { useEffect } from "react";

// const BasketPage = () => {
//   const allItems = useBasketStore((state) => state.getGroupedItems());
//   const { isSignedIn } = useAuth();
//   const { user } = useUser();
//   const router = useRouter();

//   const [isClient, setIsClient] = React.useState(false);
//   const [isLoading, setIsLoading] = React.useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isSignedIn) {
//     router.push("/sign-in");
//   }
//   return <div>BasketPage</div>;
// };

// export default BasketPage;

"use client";

import { ShoppingBasket, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import useBasketStore from "@/app/store";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { imageURL } from "@/lib/imageURL";
import AddToBasket from "@/components/AddToBasket";
import Loader from "@/components/Loader";

export default function BasketPage() {
  const allItems = useBasketStore((state) => state.getGroupedItems());
  const { getTotalPrice, removeProduct } = useBasketStore();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  console.log(allItems);

  //   return <div>BasketPage</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBasket className="h-6 w-6" />
        <h1 className="text-3xl font-bold">My Basket</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {allItems.map((item) => (
            <Card key={item.product._id} className="p-4 cursor-pointer">
              <div className="flex gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={
                      item.product.image
                        ? (imageURL(item.product.image).url() as string)
                        : ""
                    }
                    alt={item.product.name || "Product Image"}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(item.product)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-muted-foreground">
                    ₹
                    {item.product.price
                      ? item.product.price.toFixed(2)
                      : "0.00"}
                  </p>
                  <div className="flex items-center gap-2">
                    <AddToBasket product={item.product} />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {allItems.length === 0 && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <ShoppingBasket className="h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Your basket is empty</h3>
                <p className="text-muted-foreground">
                  Start shopping to add items to your basket
                </p>
              </div>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span>{allItems.length}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{getTotalPrice().toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-blue-500 hover:bg-blue-600"
                size="lg"
              >
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
