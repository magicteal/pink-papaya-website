import { z } from "zod";

export type CmsFieldType = "text" | "textarea" | "image" | "url" | "label";

export type CmsFieldConfig = {
  key: string;
  label: string;
  type: CmsFieldType;
  help?: string;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  defaultValue?: string;
};

export type CmsSectionConfig = {
  key: string;
  label: string;
  description?: string;
  fields: CmsFieldConfig[];
};

export type CmsPageConfig = {
  slug: string;
  label: string;
  publicPath: string;
  sections: CmsSectionConfig[];
  seo: {
    enabled: boolean;
  };
};

export const cmsPageConfigs: CmsPageConfig[] = [
  {
    slug: "home",
    label: "Home",
    publicPath: "/",
    seo: { enabled: true },
    sections: [
      {
        key: "hero",
        label: "Hero",
        description: "Homepage above-the-fold hero section",
        fields: [
          {
            key: "title",
            label: "Heading",
            type: "text",
            required: true,
            maxLength: 90,
            defaultValue: "Stay where every moment feels like a mood",
          },
          {
            key: "description",
            label: "Paragraph",
            type: "textarea",
            required: true,
            maxLength: 160,
            defaultValue: "Handpicked homes in Goa made for unforgettable getaways",
          },
          {
            key: "ctaLabel",
            label: "CTA Button Text",
            type: "text",
            maxLength: 40,
            defaultValue: "Explore Stays",
          },
          {
            key: "backgroundUrl",
            label: "Hero Background Image URL",
            type: "image",
            help: "Paste a URL from Media Library",
            defaultValue: "",
          },
        ],
      },
      {
        key: "explore_stays",
        label: "Explore Stays Section",
        description: "Heading and description for the Explore Stays grid",
        fields: [
          {
            key: "heading",
            label: "Heading",
            type: "text",
            required: true,
            defaultValue: "Explore Stays",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            defaultValue: "Find your perfect space.",
          },
        ],
      },
      {
        key: "rooms_and_stay",
        label: "Rooms & Stay Section",
        description: "Heading and description for the Rooms & Stay section",
        fields: [
          {
            key: "label",
            label: "Label (Tag above heading)",
            type: "text",
            defaultValue: "Rooms & Stay",
          },
          {
            key: "heading",
            label: "Heading",
            type: "text",
            required: true,
            defaultValue: "Experience the comfort.",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            defaultValue: "",
          },
          {
            key: "title1",
            label: "Title 1 (Luxury Villas)",
            type: "text",
          },
          {
            key: "desc1",
            label: "Description 1",
            type: "textarea",
          },
          {
            key: "image1",
            label: "Image 1",
            type: "image",
            defaultValue: "/images/luxury-villas.jpg",
          },
          {
            key: "title2",
            label: "Title 2 (Walk to the Beach)",
            type: "text",
          },
          {
            key: "desc2",
            label: "Description 2",
            type: "textarea",
          },
          {
            key: "image2",
            label: "Image 2",
            type: "image",
          },
          {
            key: "title3",
            label: "Title 3 (Expansive Views)",
            type: "text",
          },
          {
            key: "desc3",
            label: "Description 3",
            type: "textarea",
          },
          {
            key: "image3",
            label: "Image 3",
            type: "image",
          },
          {
            key: "title4",
            label: "Title 4 (Romantic Jacuzzi Escapes)",
            type: "text",
          },
          {
            key: "desc4",
            label: "Description 4",
            type: "textarea",
          },
          {
            key: "image4",
            label: "Image 4",
            type: "image",
          },
        ],
      },
      {
        key: "leisure_highlights",
        label: "Leisure Highlights",
        description: "Text content for the leisure section",
        fields: [
          {
            key: "tagline",
            label: "Tagline",
            type: "text",
            defaultValue: "UNWIND WITH US",
          },
          {
            key: "heading",
            label: "Heading",
            type: "text",
            required: true,
            defaultValue: "Leisure Highlights",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            defaultValue:
              "Curated experiences designed to slow time. Discover our collection of quiet moments, architectural elegance, and unparalleled serenity.",
          },
          {
            key: "title1",
            label: "Title 1",
            type: "text",
            defaultValue: "Sunsets down, served by the sea",
          },
          {
            key: "desc1",
            label: "Description 1",
            type: "textarea",
          },
          {
            key: "image1",
            label: "Image 1",
            type: "image",
          },
          {
            key: "title2",
            label: "Title 2",
            type: "text",
            defaultValue: "A look into every sunset",
          },
          {
            key: "desc2",
            label: "Description 2",
            type: "textarea",
          },
          {
            key: "image2",
            label: "Image 2",
            type: "image",
          },
          {
            key: "title3",
            label: "Title 3",
            type: "text",
            defaultValue: "Care, beyond the guidebooks",
          },
          {
            key: "desc3",
            label: "Description 3",
            type: "textarea",
          },
          {
            key: "image3",
            label: "Image 3",
            type: "image",
          },
        ],
      },
      {
        key: "testimonials",
        label: "From Our Guests",
        description: "Heading and description for the guest reviews section",
        fields: [
          {
            key: "heading",
            label: "Heading",
            type: "text",
            required: true,
            defaultValue: "From Our Guests",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            defaultValue:
              "Notes from those who've stayed and returned for more",
          },
        ],
      },
      {
        key: "faq",
        label: "Frequently Asked Questions",
        description: "Heading and details for the FAQ section",
        fields: [
          {
            key: "subtitle",
            label: "Subtitle / Description",
            type: "textarea",
            defaultValue:
              "Everything you need to know about preparing for your serene getaway with Pink Papaya Stays.",
          },
          {
            key: "ctaLabel",
            label: "CTA Label",
            type: "text",
            defaultValue: "CONTACT CONCIERGE",
          },
          {
            key: "ctaHref",
            label: "CTA Link",
            type: "text",
            defaultValue: "/contact",
          },
        ],
      },
    ],
  },
  {
    slug: "stays",
    label: "Explore Stays",
    publicPath: "/stays",
    seo: { enabled: true },
    sections: [
      {
        key: "hero",
        label: "Stays Hero",
        description: "Hero banner of the Stays page",
        fields: [
          {
            key: "title",
            label: "Hero Title",
            type: "text",
            defaultValue: "Our Stays",
          },
          {
            key: "description",
            label: "Hero Description",
            type: "textarea",
            defaultValue:
              "Curated spaces across Goa — crafted for comfort, style, and unforgettable moments.",
          },
          {
            key: "backgroundUrl",
            label: "Background Image",
            type: "image",
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Us",
    publicPath: "/about",
    seo: { enabled: true },
    sections: [
      {
        key: "hero",
        label: "About Hero",
        description: "Top section of the About page",
        fields: [
          {
            key: "heading",
            label: "Heading",
            type: "text",
            required: true,
            defaultValue: "About Us",
          },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            defaultValue: "Our story and mission.",
          },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact",
    publicPath: "/contact",
    seo: { enabled: true },
    sections: [
      {
        key: "contact_info",
        label: "Contact Information",
        description: "Address, email, and phone details",
        fields: [
          {
            key: "address",
            label: "Address",
            type: "textarea",
            defaultValue: "Goa, India",
          },
          {
            key: "email",
            label: "Email",
            type: "text",
            defaultValue: "hello@example.com",
          },
          {
            key: "phone",
            label: "Phone",
            type: "text",
            defaultValue: "+91 00000 00000",
          },
        ],
      },
    ],
  },
];

export function getCmsPageConfig(slug: string): CmsPageConfig | undefined {
  return cmsPageConfigs.find((p) => p.slug === slug);
}

export function cmsSectionSchema(section: CmsSectionConfig) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of section.fields) {
    let schema = z.string();
    if (field.required) schema = schema.min(1, `${field.label} is required`);
    if (field.maxLength) schema = schema.max(field.maxLength, `${field.label} is too long`);
    shape[field.key] = schema;
  }
  return z.object(shape);
}

export const cmsSeoSchema = z.object({
  title: z.string().max(70).optional().or(z.literal("")),
  description: z.string().max(170).optional().or(z.literal("")),
  keywords: z.array(z.string().max(40)).max(30).optional(),
  ogImageUrl: z.string().max(2048).optional().or(z.literal("")),
});
