export type Stay = {
  id: string;
  title: string;
  imageUrl: string;
  area: string;
  bed: string;
  guests: string;
  /** category id from `stayCategories` */
  category?: string;
  description?: string;
  pricePerNight?: string;
  images?: string[];
  amenities?: string[];
  location?: string;
};

export const stayCategories = [
  { id: "luxury-villas", name: "Luxury Villas", description: "Private villas with elevated finishes and personalised service." },
  { id: "walk-to-beach", name: "Walk to the Beach", description: "Short strolls to sandy shores and sunset views." },
  { id: "expansive-views", name: "Expansive Views", description: "Rooms and villas with sweeping outlooks and terraces." },
  { id: "romantic-jacuzzi-escapes", name: "Romantic Jacuzzi Escapes", description: "Cozy suites with private jacuzzis for romantic getaways." },
];

export const stays: Stay[] = [
  {
    id: "garden-suite",
    title: "Garden Suite",
    imageUrl: "/logo-files/logo-white.svg",
    area: "550 sq. ft.",
    bed: "1 King Bed",
    guests: "2 Guests",
    category: "walk-to-beach",
    description: "A bright, plant-lined suite opening to the garden courtyard.",
    pricePerNight: "$160/night",
    location: "Anjuna, Goa",
    images: [
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
    ],
    amenities: [
      "Garden Patio",
      "Queen Bed",
      "Rain Shower",
      "Breakfast",
      "Meditation Area",
      "Smart TV",
      "Yoga Mat",
      "Tea Set",
    ],
  },
  {
    id: "courtyard-room",
    title: "Courtyard Room",
    imageUrl: "/logo-files/logo-black.svg",
    area: "550 sq. ft.",
    bed: "1 King Bed",
    guests: "2 Guests",
    category: "expansive-views",
    description: "Cozy room with views of the central courtyard and greenery.",
    pricePerNight: "$140/night",
    location: "Calangute, Goa",
    images: [
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
    ],
    amenities: [
      "Garden Patio",
      "Queen Bed",
      "Rain Shower",
      "Breakfast",
      "Meditation Area",
      "Smart TV",
      "Yoga Mat",
      "Tea Set",
    ],
  },
  {
    id: "sunrise-loft",
    title: "Sunrise Loft",
    imageUrl: "/logo-files/logo-black.svg",
    area: "550 sq. ft.",
    bed: "1 King Bed",
    guests: "2 Guests",
    category: "luxury-villas",
    description: "Airy loft with morning light and warm wooden textures.",
    pricePerNight: "$170/night",
    location: "Candolim, Goa",
    images: [
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
    ],
    amenities: [
      "Garden Patio",
      "Queen Bed",
      "Rain Shower",
      "Breakfast",
      "Meditation Area",
      "Smart TV",
      "Yoga Mat",
      "Tea Set",
    ],
  },
  {
    id: "palm-villa",
    title: "Palm Villa",
    imageUrl: "/logo-files/logo-white.svg",
    area: "550 sq. ft.",
    bed: "1 King Bed",
    guests: "2 Guests",
    category: "romantic-jacuzzi-escapes",
    description: "Standalone villa tucked among palms for extra privacy.",
    pricePerNight: "$220/night",
    location: "Baga, Goa",
    images: [
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
      "/logo-files/logo-white.svg",
      "/logo-files/logo-black.svg",
    ],
    amenities: [
      "Garden Patio",
      "Queen Bed",
      "Rain Shower",
      "Breakfast",
      "Meditation Area",
      "Smart TV",
      "Yoga Mat",
      "Tea Set",
    ],
  },
  
  
];
