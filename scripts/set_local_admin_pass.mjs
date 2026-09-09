import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
  const UserSchema = new mongoose.Schema({}, { collection: "users", strict: false });
  const User = mongoose.models.User || mongoose.model("User", UserSchema);

  const hash = await bcrypt.hash("admin123", 12);
  await User.updateOne({ email: "marshadkhn89@gmail.com" }, { $set: { passwordHash: hash } });
  console.log("✅ Updated password for marshadkhn89@gmail.com to admin123");

  await mongoose.disconnect();
}

main().catch(console.error);
