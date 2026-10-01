import React from "react";
import {
  Waves,
  Wifi,
  AirVent,
  Tv,
  Coffee,
  Bed,
  ShowerHead,
  Bath,
  CookingPot,
  Utensils,
  Car,
  Trees,
  Mountain,
  Umbrella,
  Dog,
  Dumbbell,
  Sparkles,
  Shirt,
  ShieldCheck,
  Bell,
  Wine,
  Refrigerator,
  Flame,
  Zap,
  CigaretteOff,
  Sofa,
  Fan,
  Gamepad2,
  Droplets,
  Key,
  Lock,
  ChefHat,
  Home,
  Check,
  Sun,
  Microwave,
  Laptop,
  Flower2,
  HelpCircle,
} from "lucide-react";

export type AmenityCategory =
  | "Essentials"
  | "Climate & Comfort"
  | "Food & Dining"
  | "Outdoors & Views"
  | "Wellness & Leisure"
  | "Services & Safety";

export interface AmenityIconItem {
  id: string;
  name: string;
  category: AmenityCategory;
  component: React.ComponentType<{ className?: string; size?: number | string }>;
  tags: string[];
}

export const AMENITY_ICONS: AmenityIconItem[] = [
  // Essentials
  { id: "Wifi", name: "High-Speed Wi-Fi", category: "Essentials", component: Wifi, tags: ["wifi", "internet", "wireless", "broadband", "network"] },
  { id: "Bed", name: "Bed / Linen", category: "Essentials", component: Bed, tags: ["bed", "king", "queen", "double", "mattress", "bedroom"] },
  { id: "ShowerHead", name: "Rain Shower", category: "Essentials", component: ShowerHead, tags: ["shower", "rain shower", "bathroom", "water"] },
  { id: "Bath", name: "Bathtub / Jacuzzi", category: "Essentials", component: Bath, tags: ["bath", "bathtub", "tub", "jacuzzi", "hot tub", "soak"] },
  { id: "Tv", name: "Smart TV", category: "Essentials", component: Tv, tags: ["tv", "smart tv", "television", "cable", "netflix", "screen"] },
  { id: "Home", name: "Entire Property", category: "Essentials", component: Home, tags: ["home", "villa", "cottage", "entire", "house"] },
  { id: "Sofa", name: "Living Lounge", category: "Essentials", component: Sofa, tags: ["sofa", "couch", "living room", "lounge", "seating"] },
  { id: "Laptop", name: "Dedicated Workspace", category: "Essentials", component: Laptop, tags: ["workspace", "desk", "work", "laptop", "office"] },

  // Climate & Comfort
  { id: "AirVent", name: "Air Conditioning", category: "Climate & Comfort", component: AirVent, tags: ["ac", "air condition", "aircon", "cooling", "climate"] },
  { id: "Fan", name: "Ceiling Fan", category: "Climate & Comfort", component: Fan, tags: ["fan", "ceiling fan", "ventilation"] },
  { id: "Flame", name: "Fireplace / Bonfire", category: "Climate & Comfort", component: Flame, tags: ["fireplace", "fire", "bonfire", "bbq", "grill", "heating"] },

  // Food & Dining
  { id: "Coffee", name: "Breakfast / Coffee", category: "Food & Dining", component: Coffee, tags: ["coffee", "breakfast", "tea", "espresso", "kettle", "cafe"] },
  { id: "CookingPot", name: "Equipped Kitchen", category: "Food & Dining", component: CookingPot, tags: ["kitchen", "cooking", "cook", "pot", "stove"] },
  { id: "Utensils", name: "Dining & Cutlery", category: "Food & Dining", component: Utensils, tags: ["dining", "utensils", "cutlery", "food", "tableware"] },
  { id: "ChefHat", name: "Private Chef Available", category: "Food & Dining", component: ChefHat, tags: ["chef", "cook", "catering", "meals"] },
  { id: "Refrigerator", name: "Refrigerator / Mini-bar", category: "Food & Dining", component: Refrigerator, tags: ["fridge", "refrigerator", "freezer", "mini bar", "cold"] },
  { id: "Microwave", name: "Microwave Oven", category: "Food & Dining", component: Microwave, tags: ["microwave", "oven", "heat"] },
  { id: "Wine", name: "Wine / Bar Glasses", category: "Food & Dining", component: Wine, tags: ["wine", "bar", "cocktail", "alcohol", "drinks"] },

  // Outdoors & Views
  { id: "Waves", name: "Swimming Pool", category: "Outdoors & Views", component: Waves, tags: ["pool", "swimming pool", "private pool", "infinity pool", "waves", "water"] },
  { id: "Trees", name: "Private Garden / Patio", category: "Outdoors & Views", component: Trees, tags: ["garden", "patio", "lawn", "courtyard", "trees", "greenery"] },
  { id: "Mountain", name: "Scenic View / Balcony", category: "Outdoors & Views", component: Mountain, tags: ["view", "mountain", "hill", "balcony", "scenic", "terrace"] },
  { id: "Sun", name: "Sun Deck / Beach", category: "Outdoors & Views", component: Sun, tags: ["sun", "sun deck", "solarium", "beach", "terrace"] },
  { id: "Umbrella", name: "Beach Access / Gazebo", category: "Outdoors & Views", component: Umbrella, tags: ["beach", "sea", "ocean", "umbrella", "gazebo", "coastal"] },
  { id: "Car", name: "Free Parking on Premises", category: "Outdoors & Views", component: Car, tags: ["parking", "car", "garage", "driveway", "valet"] },

  // Wellness & Leisure
  { id: "Flower2", name: "Yoga / Meditation", category: "Wellness & Leisure", component: Flower2, tags: ["yoga", "meditation", "wellness", "zen", "spa"] },
  { id: "Dumbbell", name: "Fitness Gym", category: "Wellness & Leisure", component: Dumbbell, tags: ["gym", "fitness", "workout", "weights", "exercise"] },
  { id: "Droplets", name: "Hot Tub / Jacuzzi", category: "Wellness & Leisure", component: Droplets, tags: ["jacuzzi", "hot tub", "spa", "water"] },
  { id: "Gamepad2", name: "Games & Entertainment", category: "Wellness & Leisure", component: Gamepad2, tags: ["games", "console", "play", "entertainment", "board games"] },
  { id: "Sparkles", name: "Daily Housekeeping", category: "Wellness & Leisure", component: Sparkles, tags: ["housekeeping", "cleaning", "sparkles", "clean", "service"] },

  // Services & Safety
  { id: "Dog", name: "Pet Friendly", category: "Services & Safety", component: Dog, tags: ["pet", "dog", "cat", "pet friendly", "animal"] },
  { id: "ShieldCheck", name: "24/7 Security & CCTV", category: "Services & Safety", component: ShieldCheck, tags: ["security", "guard", "cctv", "safe", "secure"] },
  { id: "Lock", name: "In-Room Safe Box", category: "Services & Safety", component: Lock, tags: ["safe", "lock", "locker", "security"] },
  { id: "Key", name: "Self Check-in / Smart Lock", category: "Services & Safety", component: Key, tags: ["key", "checkin", "smart lock", "keyless"] },
  { id: "Bell", name: "Concierge / Caretaker", category: "Services & Safety", component: Bell, tags: ["concierge", "caretaker", "bell", "reception", "service"] },
  { id: "Shirt", name: "Washing Machine / Laundry", category: "Services & Safety", component: Shirt, tags: ["washer", "washing", "laundry", "dryer", "iron"] },
  { id: "Zap", name: "Power Backup / EV Charger", category: "Services & Safety", component: Zap, tags: ["ev", "charger", "power", "backup", "generator", "electricity"] },
  { id: "CigaretteOff", name: "Non-Smoking Rooms", category: "Services & Safety", component: CigaretteOff, tags: ["no smoking", "non-smoking", "smoke free"] },
];

const ICONS_MAP: Record<string, React.ComponentType<{ className?: string; size?: number | string }>> = {
  ...AMENITY_ICONS.reduce((acc, item) => {
    acc[item.id] = item.component;
    return acc;
  }, {} as Record<string, React.ComponentType<{ className?: string; size?: number | string }>>),
  Check,
  HelpCircle,
};

/**
 * Smart auto-detector: matches an amenity label to an appropriate icon
 */
export function detectAmenityIcon(amenityLabel: string): string {
  if (!amenityLabel) return "Check";
  const clean = amenityLabel.toLowerCase().trim();

  // Try direct keyword matching through icon tags
  for (const item of AMENITY_ICONS) {
    for (const tag of item.tags) {
      if (clean.includes(tag)) {
        return item.id;
      }
    }
  }

  // Fallback defaults
  if (clean.includes("sea") || clean.includes("ocean")) return "Umbrella";
  if (clean.includes("heritage") || clean.includes("tour")) return "Home";
  if (clean.includes("market") || clean.includes("walk")) return "Trees";
  return "Check";
}

export type ParsedAmenity = {
  name: string;
  icon?: string;
};

/**
 * Normalizes an amenity item whether it is a string or an object
 */
export function parseAmenity(raw: string | { name?: string; icon?: string } | unknown): ParsedAmenity {
  if (!raw) return { name: "", icon: "Check" };

  if (typeof raw === "string") {
    // Check if serialized like "Infinity Pool|icon:Waves" or "Infinity Pool|Waves"
    if (raw.includes("|")) {
      const [name, iconPart] = raw.split("|");
      const icon = iconPart.replace(/^icon:/, "").trim();
      return { name: name.trim(), icon: icon || detectAmenityIcon(name) };
    }
    return { name: raw.trim(), icon: detectAmenityIcon(raw) };
  }

  if (typeof raw === "object" && raw !== null) {
    const obj = raw as { name?: string; icon?: string };
    const name = obj.name || "";
    const icon = obj.icon || detectAmenityIcon(name);
    return { name, icon };
  }

  return { name: String(raw), icon: "Check" };
}

/**
 * Universal AmenityIcon renderer
 * Handles Lucide icons, custom image URLs (/uploads/..., https://...), and inline SVGs
 */
export function AmenityIcon({
  icon,
  fallback = "Check",
  className = "w-4 h-4",
}: {
  icon?: string;
  fallback?: string;
  className?: string;
}) {
  const iconKey = icon || fallback;

  // Custom uploaded image URL
  if (iconKey && (iconKey.startsWith("http://") || iconKey.startsWith("https://") || iconKey.startsWith("/"))) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={iconKey}
        alt=""
        aria-hidden="true"
        className={`${className} object-contain`}
      />
    );
  }

  // Raw inline SVG
  if (iconKey && iconKey.trim().startsWith("<svg")) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block ${className}`}
        dangerouslySetInnerHTML={{ __html: iconKey }}
      />
    );
  }

  // Lucide Icon Component
  const Component = ICONS_MAP[iconKey] || ICONS_MAP[fallback] || Check;
  return <Component className={className} />;
}
