import { promises as fs } from "fs";
import path from "path";

export type Location = {
  id: string;
  name: string;
  stayIds: string[];
};

const dataDir = path.join(process.cwd(), "src", "data");
const jsonPath = path.join(dataDir, "locations.json");

async function ensureJsonFile() {
  try {
    await fs.access(jsonPath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify([], null, 2), "utf8");
  }
}

export async function readLocations(): Promise<Location[]> {
  await ensureJsonFile();
  const raw = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

export async function writeLocations(next: Location[]): Promise<void> {
  await fs.writeFile(jsonPath, JSON.stringify(next, null, 2), "utf8");
}

export async function getLocationById(id: string): Promise<Location | undefined> {
  const list = await readLocations();
  return list.find((l) => l.id === id);
}

export async function addLocation(location: Location): Promise<Location> {
  const list = await readLocations();
  if (list.find((l) => l.id === location.id)) {
    throw new Error("Location with this id already exists");
  }
  const next = [...list, location];
  await writeLocations(next);
  return location;
}

export async function updateLocation(id: string, patch: Partial<Location>): Promise<Location> {
  const list = await readLocations();
  const idx = list.findIndex((l) => l.id === id);
  if (idx === -1) throw new Error("Location not found");
  const updated = { ...list[idx], ...patch, id };
  list[idx] = updated as Location;
  await writeLocations(list);
  return updated as Location;
}

export async function deleteLocation(id: string): Promise<void> {
  const list = await readLocations();
  const next = list.filter((l) => l.id !== id);
  await writeLocations(next);
}
