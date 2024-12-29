// Adjust path as needed

interface SanityBlock {
  _type: string;
  children?: { text: string }[];
}

export const getPlainText = (blocks: SanityBlock[]): string => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children.map((child) => child.text).join("");
      }
      return ""; // Ignore non-block types
    })
    .join("\n"); // Add newlines between blocks
};
