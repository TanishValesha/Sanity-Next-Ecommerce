import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ListCollapse, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { imageURL } from "@/lib/imageURL";
import { getCategory } from "@/sanity/lib/products/getCategory";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  category: string;
  slug: string;
}

export async function ProductCard({
  title,
  price,
  image,
  category,
  slug,
}: ProductCardProps) {
  const categoryName = await getCategory(category);
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <Image
            src={imageURL(image).url() as string}
            alt={title}
            fill
            className="object-cover transition-all hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{categoryName}</p>
        <h3 className="font-semibold text-lg mt-1 leading-tight">{title}</h3>
        <p className="text-xl font-bold mt-2">₹{price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full gap-2 bg-blue-500 hover:bg-blue-600">
          <ShoppingCart size={16} />
          Add to Cart
        </Button>
        <Link href={`/product/${slug}`}>
          <Button className="w-full gap-2 bg-blue-500 hover:bg-blue-600">
            <ListCollapse size={16} />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
