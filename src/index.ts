import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { translateText } from "./translate-text";

type Bindings = {
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const schema = z.object({
  language: z.string(),
  text: z.string(),
});

app.post("/", zValidator("json", schema), async (c) => {
  const { language, text } = c.req.valid("json");
  const apiKey = c.env.OPENAI_API_KEY;
  const res = await translateText({ apiKey, language, text });
  return c.json(res);
});

export default app;
