import { defineField, defineType } from "sanity";

export const residency = defineType({
  name: "residency",
  title: "Residency",
  type: "document",
  fields: [
    defineField({
      name: "chefName",
      title: "Chef Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "residencyName",
      title: "Residency Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Currently Active",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "philosophy",
      title: "Philosophy / One-liner",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      description: "e.g. Formerly: Gastrologist, Da Terra",
      type: "string",
    }),
    defineField({
      name: "menuPdf",
      title: "Menu PDF",
      type: "file",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Handle",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: {
      title: "residencyName",
      subtitle: "chefName",
      media: "heroImage",
    },
  },
});
