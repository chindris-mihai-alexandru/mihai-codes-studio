import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publish Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g., "5 min read"',
    }),
    defineField({
      name: 'draft',
      title: 'Draft',
      type: 'boolean',
      description: 'If true, post is hidden from listing but accessible by direct URL',
      initialValue: false,
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      description: 'Markdown content for the blog post',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      draft: 'draft',
    },
    prepare({title, date, draft}) {
      return {
        title: draft ? `[DRAFT] ${title}` : title,
        subtitle: date,
      }
    },
  },
})
