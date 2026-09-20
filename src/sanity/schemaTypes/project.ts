import { defineField, defineType } from "sanity";

// Matches the Project type in src/lib/projects.ts field-for-field, so the
// data-fetching layer can map a Sanity document straight onto it.
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL segment — becomes /work/this-value. Lowercase, hyphenated.",
      options: { source: "title", maxLength: 60 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      description: 'The real client/collaborator name, e.g. "Delta Mike". Never a placeholder.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceDeliverable",
      title: "Service — Deliverable",
      type: "string",
      description: 'Short tag shown on the Work grid card, e.g. "Brand Content — Product Film".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "filterCategory",
      title: "Filter Category",
      type: "string",
      description: "Drives the All / Production / Post / Brand / Event filter on the Work page.",
      options: {
        list: [
          { title: "Production", value: "Production" },
          { title: "Post", value: "Post" },
          { title: "Brand", value: "Brand" },
          { title: "Event", value: "Event" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Display Category",
      type: "string",
      description: 'Shown as the "[CATEGORY] / [YEAR]" tag on the project page, e.g. "Field Film".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "brief",
      title: "The Brief",
      type: "text",
      rows: 3,
      description: "2-3 sentences on the objective.",
    }),
    defineField({
      name: "role",
      title: "Our Role",
      type: "text",
      rows: 2,
      description: 'Specific deliverables, e.g. "Concept Development / Direction / Filming / Editing".',
    }),
    defineField({
      name: "approach",
      title: "The Approach",
      type: "text",
      rows: 3,
      description: "Creative direction, pacing and visual decisions.",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      of: [{ type: "string" }],
      description: 'Itemized list, e.g. "1x Hero Film", "3x Social Cutdowns".',
    }),
    defineField({
      name: "credits",
      title: "Credits",
      type: "text",
      rows: 2,
      description: "Verified, real credits only.",
    }),
    defineField({
      name: "previewVideo",
      title: "Preview Video (grid card)",
      type: "file",
      description: "Short, muted, looping clip for the Work grid card. Should already be 16:9.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "fullVideo",
      title: "Full Video (project page)",
      type: "file",
      description: "The complete clip with sound, shown on the project's own page.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Lower numbers appear first on the Work grid. Leave blank to sort by year instead.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "previewVideo" },
  },
});
