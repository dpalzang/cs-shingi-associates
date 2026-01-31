import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    location: z.string(),
    status: z.enum(['Completed', 'Ongoing', 'Concept']),
    coverImage: image(), // <--- Astro validates this is a real image
    gallery: z.array(image()).optional(),
  }),
});

export const collections = { projects };