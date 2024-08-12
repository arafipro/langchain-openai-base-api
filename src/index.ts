import { zValidator } from "@hono/zod-validator";
import { ChatOpenAI } from "@langchain/openai";
import { Hono } from "hono";
import { z } from "zod";

type Bindings = {
  OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

const schema = z.object({
  prompt: z.string(),
});

app.post("/", zValidator("json", schema), async (c) => {
  const apiKey = c.env.OPENAI_API_KEY;
  const model = new ChatOpenAI({ apiKey: apiKey, model: "gpt-4o-mini" });
  const body = await c.req.valid("json");
  return c.json(body);
});

export default app;
