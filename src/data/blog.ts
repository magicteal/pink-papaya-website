export type BlogPost = {
  id: string;
  title: string;
  imageUrl: string;
  author: string;
  date: string; // e.g., "September 26, 2025"
  excerpt: string;
  content: string; // Will be a long string, potentially with markdown
};

export const posts: BlogPost[] = [
  {
    id: "coastal-living-guide",
    title: "A Guide to Coastal Living",
    imageUrl: "/images/hotel.svg",
    author: "Jane Doe",
    date: "September 20, 2025",
    excerpt: "Discover the serene beauty and lifestyle of coastal living with our insider tips.",
    content: "Coastal living is more than just a location; it's a state of mind. The sound of the waves, the salty air, and the endless horizon can bring a sense of calm and perspective that is hard to find elsewhere.\n\nIn this guide, we'll explore the best ways to embrace the coastal lifestyle, from morning beach walks to enjoying fresh, local seafood. We believe that a connection to the ocean is a connection to oneself."
  },
  {
    id: "interior-design-secrets",
    title: "Secrets of Serene Interior Design",
    imageUrl: "/logo-files/logo-black.svg",
    author: "John Smith",
    date: "September 15, 2025",
    excerpt: "Learn how to bring tranquility into your home with these simple design principles.",
    content: "Creating a serene living space is about more than just aesthetics; it's about creating a sanctuary. Start with a neutral color palette to create a calming backdrop. Natural materials like wood, linen, and stone can add warmth and texture.\n\nLighting is also key. Maximize natural light where possible, and use soft, warm lighting in the evenings to create a cozy atmosphere. Finally, declutter your space to declutter your mind. A minimalist approach can have a profound impact on your sense of well-being."
  }
];
