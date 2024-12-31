import Image from "next/image";
import { imageURL } from "@/lib/imageURL";

interface ProductImageProps {
  image: string;
  name: string;
}

export function ProductImage({ image, name }: ProductImageProps) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={imageURL(image).url() as string}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
