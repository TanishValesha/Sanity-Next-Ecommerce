/* eslint-disable @typescript-eslint/no-explicit-any */
import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";

interface ContentProps {
  content: PortableTextBlock[];
}

const MyComponent: React.FC<ContentProps> = ({ content }) => {
  const components = {
    types: {
      image: ({ value }: any) => (
        <Image
          src={value.asset.url}
          alt={value.alt || "Image"}
          className="rounded-md"
        />
      ),
    },
    marks: {
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {children}
        </a>
      ),
    },
    block: {
      h1: ({ children }: any) => (
        <h1 className="text-4xl font-bold">{children}</h1>
      ),
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-semibold">{children}</h2>
      ),
      normal: ({ children }: any) => (
        <p className="text-base text-gray-700">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc ml-5">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal ml-5">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="mb-2">{children}</li>,
    },
  };

  return <PortableText value={content} components={components} />;
};

export default MyComponent;
