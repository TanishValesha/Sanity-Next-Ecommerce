import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  icon: BasketIcon,
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripeCheckoutSessionId",
      title: "Stripe Checkout Session ID",
      type: "string",
    }),
    defineField({
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
            defineField({
              name: "quantity",
              title: "Quantity Purchased",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              title: "product.name",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
              quantity: "quantity",
            },
            prepare(select) {
              return {
                title: `${select.product} x ${select.quantity}`,
                subtitle: `${select.price * select.quantity}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "amountDiscount",
      title: "Amount Discount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
    }),
    defineField({
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: "customerName",
      amount: "totalPrice",
      currency: "currency",
      status: "status",
      orderId: "orderNumber",
      email: "email",
    },
    prepare(select) {
      let orderIdSnippet = "";
      if (select.orderId) {
        orderIdSnippet = `${select.orderId.slice(0, 6)}}...${select.orderId.slice(
          -6
        )}`;
      }
      return {
        title: `${select.name} - (${orderIdSnippet})`,
        subtitle: `${select.amount}, ${select.currency}, ${select.email} - ${select.status}`,
        media: BasketIcon,
      };
    },
  },
});
