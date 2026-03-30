import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Date", type: "datetime" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "isSoldOut", title: "Sold Out", type: "boolean", initialValue: false }),
    defineField({ name: "ticketUrl", title: "Ticket / Booking URL", type: "url" }),
    defineField({ name: "isRecurring", title: "Recurring (e.g. every Sunday)", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
  },
});
