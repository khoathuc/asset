import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
});

export const env = envSchema.parse(process.env);
