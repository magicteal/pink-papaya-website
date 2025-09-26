import { promises as fs } from "fs";
import path from "path";
import { posts as seedPosts } from "@/data/blog";

export type BlogPost = typeof seedPosts[number];

const dataDir = path.join(process.cwd(), "src", "data");
const jsonPath = path.join(dataDir, "blog.json");

async function ensureJsonFile() {
  try {
    await fs.access(jsonPath);
  } catch {
    // Seed from static data file if it doesn't exist
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(jsonPath, JSON.stringify(seedPosts, null, 2), "utf8");
  }
}

export async function readPosts(): Promise<BlogPost[]> {
  await ensureJsonFile();
  const raw = await fs.readFile(jsonPath, "utf8");
  return JSON.parse(raw);
}

export async function writePosts(next: BlogPost[]): Promise<void> {
  await fs.writeFile(jsonPath, JSON.stringify(next, null, 2), "utf8");
}

export async function getPostById(id: string): Promise<BlogPost | undefined> {
  const list = await readPosts();
  return list.find((p) => p.id === id);
}

export async function addPost(post: BlogPost): Promise<BlogPost> {
  const list = await readPosts();
  if (list.find((p) => p.id === post.id)) {
    throw new Error("Blog post with this id already exists");
  }
  const next = [...list, post];
  await writePosts(next);
  return post;
}

export async function updatePost(id: string, patch: Partial<BlogPost>): Promise<BlogPost> {
  const list = await readPosts();
  const idx = list.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error("Blog post not found");
  const updated = { ...list[idx], ...patch, id };
  list[idx] = updated as BlogPost;
  await writePosts(list);
  return updated as BlogPost;
}

export async function deletePost(id: string): Promise<void> {
  const list = await readPosts();
  const next = list.filter((p) => p.id !== id);
  await writePosts(next);
}
