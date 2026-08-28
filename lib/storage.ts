import { promises as fs } from "node:fs";
import path from "node:path";

const runtimeDir = path.join(process.cwd(), "data", "runtime");

async function ensureRuntimeDir() {
  await fs.mkdir(runtimeDir, { recursive: true });
}

export async function readRuntimeFile<T>(fileName: string, fallback: T): Promise<T> {
  await ensureRuntimeDir();
  const filePath = path.join(runtimeDir, fileName);

  try {
    const contents = await fs.readFile(filePath, "utf8");
    return JSON.parse(contents) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return fallback;
    }
    throw error;
  }
}

export async function writeRuntimeFile<T>(fileName: string, value: T) {
  await ensureRuntimeDir();
  const filePath = path.join(runtimeDir, fileName);
  await fs.writeFile(filePath, JSON.stringify(value, null, 2));
}

export async function upsertRuntimeRecord<T extends { slug: string }>(
  fileName: string,
  record: T,
) {
  const records = await readRuntimeFile<T[]>(fileName, []);
  const filtered = records.filter((item) => item.slug !== record.slug);
  const nextRecords = [record, ...filtered];
  await writeRuntimeFile(fileName, nextRecords);
  return record;
}

export async function postWebhookJson(url: string, payload: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }
}
