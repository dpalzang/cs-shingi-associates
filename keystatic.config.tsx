// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*', 
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        location: fields.text({ label: 'Location' }),
        
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'For Sale', value: 'For Sale' },
            { label: 'Sold Out', value: 'Sold Out' },
            { label: 'Under Construction', value: 'Under Construction' },
          ],
          defaultValue: 'For Sale'
        }),
        
        year: fields.text({ label: 'Year' }),

        // 1. UPDATED: Cover Image
        // Uses {slug} to put images in distinct folders
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/projects/{slug}',
          publicPath: '/images/projects/{slug}/',
        }),

        price: fields.text({ label: 'Price Range' }),
        type: fields.text({ label: 'Property Type' }),

        // 2. UPDATED: Gallery
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'public/images/projects/{slug}',
            publicPath: '/images/projects/{slug}/',
          }),
          {
            label: 'Photo Gallery',
            itemLabel: (props) => 'Image', 
          }
        ),

        details: fields.array(
          fields.object({
            label: fields.text({ label: 'Label (e.g., Area)' }),
            value: fields.text({ label: 'Value (e.g., 2,400 sq ft)' }),
          }),
          {
            label: 'Property Details',
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          }
        ),

        // 3. UPDATED: Content Images
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/projects/{slug}',
            publicPath: '/images/projects/{slug}/',
          },
        }),
      },
    }),
  },
});