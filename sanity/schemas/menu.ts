import { defineField, defineType, defineArrayMember } from "sanity";

const menuItem = defineArrayMember({
  type: "object",
  name: "menuItem",
  fields: [
    defineField({ name: "name", title: "Dish Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "price", title: "Price", type: "string", description: "e.g. £12" }),
    defineField({
      name: "dietary",
      title: "Dietary",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian (v)", value: "v" },
          { title: "Vegan (vg)", value: "vg" },
          { title: "Gluten Free (gf)", value: "gf" },
        ],
      },
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});

const menuSection = defineArrayMember({
  type: "object",
  name: "menuSection",
  fields: [
    defineField({ name: "sectionName", title: "Section Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "items", title: "Items", type: "array", of: [menuItem] }),
  ],
  preview: {
    select: { title: "sectionName" },
  },
});

export const menu = defineType({
  name: "menu",
  title: "Menu",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Menu Type",
      type: "string",
      options: {
        list: [
          { title: "Food", value: "food" },
          { title: "Drinks", value: "drinks" },
          { title: "Happy Hour", value: "happyHour" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "residencyRef",
      title: "Residency",
      type: "reference",
      to: [{ type: "residency" }],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [menuSection],
    }),
    defineField({
      name: "image",
      title: "Feature Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isActive",
      title: "Currently Active",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "type",
      subtitle: "residencyRef.residencyName",
    },
    prepare({ title, subtitle }) {
      const labels: Record<string, string> = { food: "Food Menu", drinks: "Drinks Menu", happyHour: "Happy Hour" };
      return { title: labels[title] || title, subtitle };
    },
  },
});
