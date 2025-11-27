import { promises as fs } from "fs";
import path from "path";
import { interiorProjects as seedProjects } from "@/data/interior";

export type InteriorProject = typeof seedProjects[number];

const dataDir = path.join(process.cwd(), "src", "data");
const jsonPath = path.join(dataDir, "interior.json");

async function ensureJsonFile() {
  try {
    await fs.access(jsonPath);
  } catch {
    // Seed from static data file
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(seedProjects, null, 2), "utf8");
  }
}

export async function readInteriorProjects(): Promise<InteriorProject[]> {
  await ensureJsonFile();
  const raw = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

export async function writeInteriorProjects(next: InteriorProject[]): Promise<void> {
  await fs.writeFile(jsonPath, JSON.stringify(next, null, 2), "utf8");
}

export async function getInteriorProjectById(id: string): Promise<InteriorProject | undefined> {
  const list = await readInteriorProjects();
  return list.find((p) => p.id === id);
}

export async function addInteriorProject(project: InteriorProject): Promise<InteriorProject> {
  const list = await readInteriorProjects();
  if (list.find((p) => p.id === project.id)) {
    throw new Error("Interior project with this id already exists");
  }
  const next = [...list, project];
  await writeInteriorProjects(next);
  return project;
}

export async function updateInteriorProject(id: string, patch: Partial<InteriorProject>): Promise<InteriorProject> {
  const list = await readInteriorProjects();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Interior project not found");
  const updated = { ...list[idx], ...patch, id };
  list[idx] = updated as InteriorProject;
  await writeInteriorProjects(list);
  return updated as InteriorProject;
}

export async function deleteInteriorProject(id: string): Promise<void> {
  const list = await readInteriorProjects();
  const next = list.filter((p) => p.id !== id);
  await writeInteriorProjects(next);
}
