import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Sale Title",
    }),
    defineField({
      name: "desciption",
      type: "string",
      title: "Sale Description",
    }),
    defineField({
      name: "discountAmount",
      type: "number",
      title: "Discount Amount",
      description: "Amount of discount in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      type: "string",
      title: "Coupon Code",
    }),
    defineField({
      name: "validFrom",
      type: "datetime",
      title: "Valid From",
    }),
    defineField({
      name: "validUntil",
      type: "datetime",
      title: "Valid Until",
    }),
    defineField({
      name: "isActive",
      type: "boolean",
      title: "Is Active",
      description: "Is the sale currently active?",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `${select.discountAmount}% Off | Code: ${select.couponCode} | Active: ${select.isActive ? "Yes" : "No"}`,
        media: TagIcon,
      };
    },
  },
});
