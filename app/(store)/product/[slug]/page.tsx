import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";
import { ProductInfo } from "@/components/ProductInfo";
import { getProduct } from "@/sanity/lib/products/getProduct";
import { getCategory } from "@/sanity/lib/products/getCategory";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProduct(slug);
  const product = products[0];

  if (!product) {
    notFound();
  }

  const categoryName = await getCategory(
    product.category?.map((cat) => cat._ref).join(", ") || ""
  );

  return (
    <div className="min-h-screen bg-background px-32 py-10">
      <div className="">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductImage
            image={product.image?.asset?._ref || ""}
            name={product.name || "No Name"}
          />
          <ProductInfo
            key={product._id}
            title={product.name || "No Title"}
            price={product.price || 0}
            rating={product.rating || 0}
            reviews={product.reviews || 0}
            category={categoryName}
            description={
              product.description
                ?.map((block) =>
                  block._type === "block"
                    ? block.children?.map((child) => child.text).join("")
                    : ""
                )
                .join("") || "No Description"
            }
          />
        </div>
      </div>
    </div>
  );
}
