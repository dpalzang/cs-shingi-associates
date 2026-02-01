// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    location: z.string(),
    status: z.string(), 
    year: z.string(),
    
    coverImage: z.string(),
    
    price: z.string().optional(),
    type: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    details: z.array(z.object({
        label: z.string(),
        value: z.string(),
    })).optional(),
  }),
});

export const collections = { projects };