import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#") && t.includes("=")) {
      const [k, ...v] = t.split("=");
      process.env[k.trim()] = v.join("=").trim();
    }
  }
}

const uri = process.env.MONGODB_URI || "mongodb+srv://pink-papaya:c3Nr2vYQZfJJuiFz@pinkpapaya.ohd1bmr.mongodb.net/pink-papaya?appName=pinkpapaya";

async function main() {
  await mongoose.connect(uri);
  const StaySchema = new mongoose.Schema({}, { collection: "stays", strict: false });
  const Stay = mongoose.models.Stay || mongoose.model("Stay", StaySchema);

  const testProperty = {
    id: "arshad-property",
    title: "Arshad Property",
    area: "400 sq ft",
    bed: "1 King Bed",
    guests: "2 Guests",
    category: "luxury-villas",
    collections: ["Luxury Villas"],
    location: "Candolim, North Goa",
    pricePerNight: "On Request",
    propertyType: "villas",
    description: "A luxury test property created for testing property updates.",
    aboutContent: "Arshad Property is a premium test villa used for verifying stay creation, image ordering, and stay updates in the admin panel.",
    imageUrl: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Pool", "WiFi", "Air conditioning", "Free parking"],
    nearbyPlaces: [{ name: "Candolim Beach", distance: "5 min walk" }],
    faqs: [{ question: "Is this a test property?", answer: "Yes, this is Arshad Property created for testing." }],
    featuredOnHome: false
  };

  await Stay.updateOne({ id: "arshad-property" }, { $set: testProperty }, { upsert: true });
  console.log("✅ Created test property 'Arshad Property' (id: arshad-property) in database.");

  await mongoose.disconnect();
}

main().catch(console.error);
