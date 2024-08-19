import { zValidator } from "@hono/zod-validator";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Runnable } from "@langchain/core/runnables";
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
  const model = new ChatOpenAI({
    apiKey: apiKey,
    model: "gpt-4o-mini",
  }) as unknown as Runnable;
  const systemTemplate = "次の文章を英語から{language}に翻訳してください。";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);
  const parser = new StringOutputParser();
  const chain = promptTemplate.pipe(model).pipe(parser);
  const res = await chain.invoke({ language: "日本語", text: "hi" });
  return c.json(res);
});

export default app;
