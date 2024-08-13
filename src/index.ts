import { zValidator } from "@hono/zod-validator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
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
  const message = [
    new SystemMessage("次の文章を英語から日本語に翻訳してください。"),
    new HumanMessage("hi!"),
  ];
  const res = await model.invoke(message);
  // const body = await c.req.valid("json");
  return c.json(res);
});

export default app;
