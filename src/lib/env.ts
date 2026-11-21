import { z } from "zod";

const emptyToUndefined = <T extends z.ZodTypeAny>(schema: T) =>
  z.preprocess((val) => (typeof val === "string" && val.trim() === "" ? undefined : val), schema);

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  AUTH_SECRET: emptyToUndefined(z.string().min(24, "AUTH_SECRET must be at least 24 chars").optional()),
  MONGODB_URI: emptyToUndefined(z.string().url().optional()),
  MONGODB_DB_NAME: z.string().min(1).default("pink-papaya"),
  NEXT_PUBLIC_CDN_BASE_URL: emptyToUndefined(z.string().url().optional()),
  NEXT_PUBLIC_SITE_URL: emptyToUndefined(z.string().url().optional()),
  MEDIA_DIR: emptyToUndefined(z.string().min(1).optional()),
  MEDIA_PROXY_ORIGIN: emptyToUndefined(z.string().url().optional()),
  INSTAGRAM_ACCESS_TOKEN: emptyToUndefined(z.string().min(1).optional()),
  // SMTP config for sending website form submissions by email.
  SMTP_HOST: emptyToUndefined(z.string().min(1).optional()),
  SMTP_PORT: emptyToUndefined(z.string().min(1).optional()),
  SMTP_USER: emptyToUndefined(z.string().min(1).optional()),
  SMTP_PASS: emptyToUndefined(z.string().min(1).optional()),
  SMTP_SECURE: emptyToUndefined(z.enum(["true", "false"]).optional()),
  CONTACT_EMAIL_TO: emptyToUndefined(z.string().optional()),
  CONTACT_EMAIL_FROM: emptyToUndefined(z.string().optional()),
  // Google Apps Script web-app URL that logs partner-form submissions to a sheet.
  PARTNER_SHEET_WEBHOOK_URL: emptyToUndefined(z.string().url().optional()),
});

const parsed = serverEnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables. Check server logs for details.");
}

export const env = parsed.data;

export function requireEnv(name: keyof typeof env): string {
  const value = env[name];
  if (!value || typeof value !== "string") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function assertMongoConfigured() {
  if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured");
  }
}
