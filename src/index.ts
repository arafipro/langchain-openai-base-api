import { zValidator } from "@hono/zod-validator";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
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
  const systemTemplate = "次の文章を英語から{language}に翻訳してください。";
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["user", "{text}"],
  ]);
  const res = await promptTemplate.invoke({ language: "日本語", text: "hi" });
  // const parser = new StringOutputParser();
  // const chain = model.pipe(parser);
  // const res = await chain.invoke(message);
  // const body = await c.req.valid("json");
  return c.json(res);
});

export default app;
