// keystatic.config.tsx
import { config, fields, collection } from '@keystatic/core';

// FIX: Define the component outside the config object to prevent recursion errors
const CsShingiLogo = () => (
  <img
    src="/images/logo.jpg"
    alt="CS Shingi Logo"
    height={24}
    className="h-6 w-auto"
  />
);

export default config({
  storage: import.meta.env.DEV ?
   { kind: 'local' } : {
      kind: 'github',
      repo: 'dpalzang/cs-shingi-associates', // Your Repo Name
    },

  ui: {
    brand: {
      name: 'CS Shingi Admin',
      // Reference the external component
      mark: CsShingiLogo,
    },
    navigation: {
      'Portfolio': ['projects'],
      'Updates': ['news'],
    },
  },

  collections: {
    projects: collection({
      label: 'Projects',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Project Name' } }),
        location: fields.text({ label: 'Location' }),
        year: fields.text({ label: 'Year Completed' }),
        status: fields.select({
          label: 'Project Status',
          options: [
            { label: 'Completed', value: 'Completed' },
            { label: 'Under Construction', value: 'Ongoing' },
            { label: 'Concept / Unbuilt', value: 'Concept' },
          ],
          defaultValue: 'Completed',
        }),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'src/assets/projects',
          publicPath: '@assets/projects',
          validation: { isRequired: true },
        }),
        gallery: fields.array(
          fields.image({
            label: 'Gallery Image',
            directory: 'src/assets/projects/gallery',
            publicPath: '@assets/projects/gallery',
          }),
          { label: 'Project Gallery' }
        ),
        content: fields.document({
          label: 'Project Description',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'src/assets/projects/inline',
            publicPath: '@assets/projects/inline',
          },
        }),
      },
    }),

    news: collection({
      label: 'News & Insights',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Headline' } }),
        date: fields.date({ label: 'Publish Date', validation: { isRequired: true } }),
        category: fields.select({
          label: 'Category',
          options: [
            { label: 'Press Release', value: 'News' },
            { label: 'Thought Leadership', value: 'Insight' },
            { label: 'Award', value: 'Award' },
          ],
          defaultValue: 'News',
        }),
        cardColor: fields.select({
          label: 'Card Background Color',
          options: [
            { label: 'Obsidian (Black)', value: 'bg-obsidian' },
            { label: 'Gold Gradient', value: 'bg-gold-gradient' },
            { label: 'Deep Blue (Official)', value: 'bg-[#1a237e]' },
            { label: 'Magenta (Report)', value: 'bg-[#ad1457]' },
          ],
          defaultValue: 'bg-obsidian',
        }),
        content: fields.document({
          label: 'Article Content',
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});