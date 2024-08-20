import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Runnable } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

export async function translateText({
  apiKey,
  language,
  text,
}: {
  apiKey: string;
  language: string;
  text: string;
}) {
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
  const res = await chain.invoke({ language: language, text: text });
  return res;
}
