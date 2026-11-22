import { stays as seedStays } from "@/data/stays";
import connectToDatabase from "@/lib/mongodb";
import { Stay as StayModel } from "@/lib/models/Stay";
import mongoose from "mongoose";

export type Stay = typeof seedStays[number];

let seedPromise: Promise<void> | null = null;
let cachedStays: Stay[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export function invalidateStaysCache() {
  cachedStays = null;
  lastCacheTime = 0;
}

async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      await connectToDatabase();
      const count = await StayModel.countDocuments();
      if (count === 0) {
        await StayModel.insertMany(seedStays);
      }
    })();
  }
  return seedPromise;
}

function toStay(doc: any): Stay {
  const { _id, __v, createdAt, updatedAt, ...rest } = doc;
  return {
    ...rest,
    id: rest.id || _id.toString(),
  } as Stay;
}

export async function readStays(filters?: { category?: string; location?: string; guests?: string }): Promise<Stay[]> {
  await ensureSeeded();

  const now = Date.now();
  let all: Stay[];
  if (cachedStays && (now - lastCacheTime < CACHE_TTL_MS)) {
    all = cachedStays;
  } else {
    const docs = await StayModel.find({}).lean();
    all = docs.map(toStay);
    cachedStays = all;
    lastCacheTime = now;
  }

  let filtered = all;
  if (filters?.category) {
    filtered = filtered.filter(
      (s) => s.category === filters.category || s.categories?.includes(filters.category!)
    );
  }

  if (filters?.guests) {
    const requestedGuests = parseInt(filters.guests, 10);
    filtered = filtered.filter((stay) => {
      const stayGuestsMatch = (stay.guests || "").match(/\d+/);
      const stayGuests = stayGuestsMatch ? parseInt(stayGuestsMatch[0], 10) : 0;
      return stayGuests >= requestedGuests;
    });
  }

  return filtered;
}

export async function getStayById(id: string): Promise<Stay | undefined> {
  const all = await readStays();
  const found = all.find((s) => s.id === id);
  if (found) return found;

  // Fallback to direct DB lookup in case ID is a Mongo ObjectId
  if (mongoose.isValidObjectId(id)) {
    await ensureSeeded();
    const doc = await StayModel.findById(id).lean();
    return doc ? toStay(doc) : undefined;
  }
  return undefined;
}

export async function addStay(stay: Stay): Promise<Stay> {
  await ensureSeeded();
  const doc = await StayModel.findOneAndUpdate(
    { id: stay.id },
    { $set: stay },
    { upsert: true, new: true }
  ).lean();
  invalidateStaysCache();
  return toStay(doc!);
}

export async function updateStay(id: string, patch: Partial<Stay>): Promise<Stay> {
  await ensureSeeded();
  let query: any = { id };
  if (mongoose.isValidObjectId(id)) {
    const existing = await StayModel.findOne({ id }).lean();
    if (!existing) query = { _id: id };
  }
  const doc = await StayModel.findOneAndUpdate(
    query,
    { $set: patch },
    { new: true }
  ).lean();
  if (!doc) throw new Error("Not found");
  invalidateStaysCache();
  return toStay(doc);
}

export async function deleteStay(id: string): Promise<void> {
  await ensureSeeded();
  let query: any = { id };
  if (mongoose.isValidObjectId(id)) {
    const existing = await StayModel.findOne({ id }).lean();
    if (!existing) query = { _id: id };
  }
  await StayModel.deleteOne(query);
  invalidateStaysCache();
}
