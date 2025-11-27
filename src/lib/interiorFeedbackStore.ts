import { promises as fs } from "fs";
import path from "path";
import { interiorFeedback as seedFeedback } from "@/data/interiorFeedback";

export type InteriorFeedbackItem = typeof seedFeedback[number];

const dataDir = path.join(process.cwd(), "src", "data");
const jsonPath = path.join(dataDir, "interiorFeedback.json");

async function ensureJsonFile() {
  try {
    await fs.access(jsonPath);
  } catch {
    // Seed from static data file
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(seedFeedback, null, 2), "utf8");
  }
}

export async function readInteriorFeedback(): Promise<InteriorFeedbackItem[]> {
  await ensureJsonFile();
  const raw = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

export async function writeInteriorFeedback(next: InteriorFeedbackItem[]): Promise<void> {
  await fs.writeFile(jsonPath, JSON.stringify(next, null, 2), "utf8");
}

export async function getInteriorFeedbackById(id: string): Promise<InteriorFeedbackItem | undefined> {
  const list = await readInteriorFeedback();
  return list.find((f) => f.id === id);
}

export async function addInteriorFeedback(feedback: InteriorFeedbackItem): Promise<InteriorFeedbackItem> {
  const list = await readInteriorFeedback();
  if (list.find((f) => f.id === feedback.id)) {
    throw new Error("Interior feedback with this id already exists");
  }
  const next = [...list, feedback];
  await writeInteriorFeedback(next);
  return feedback;
}

export async function updateInteriorFeedback(id: string, patch: Partial<InteriorFeedbackItem>): Promise<InteriorFeedbackItem> {
  const list = await readInteriorFeedback();
  const idx = list.findIndex((f) => f.id === id);
  if (idx === -1) throw new Error("Interior feedback not found");
  const updated = { ...list[idx], ...patch, id };
  list[idx] = updated as InteriorFeedbackItem;
  await writeInteriorFeedback(list);
  return updated as InteriorFeedbackItem;
}

export async function deleteInteriorFeedback(id: string): Promise<void> {
  const list = await readInteriorFeedback();
  const next = list.filter((f) => f.id !== id);
  await writeInteriorFeedback(next);
}
