import type { Action } from "../components/types";
import { FileEditor } from "./fileEditor";

export type CatResponse = {
  text: string;
  action?: Action;
};

const vocabulary = {
  greeting: ["ﾆｬｯ", "ﾐｬｯ", "ﾆｬ"],
  affection: ["ﾆｬｵ~ﾝ", "ﾐｬｵ~", "ﾆｬﾝﾆｬﾝ"],
  satisfaction: ["ｺﾞﾛｺﾞﾛ", "ﾆｬ~"],
  excitement: ["ﾆｬﾆｬﾆｬ!", "ﾐｬｰ!", "ﾆｬｯﾆｬｯ"],
  playful: ["ﾆｬｰﾝ", "ﾐｬﾐｬ", "ﾆｬｵｯ"],
  sleepy: ["ﾆｬ…", "ﾌﾆｬ~", "ﾆｬ~ﾝ"],
  hungry: ["ﾆｬｵｫﾝ", "ﾐｬｰｵ", "ﾆｬﾝﾆｬﾝ!"],
} as const;

type Emotion = keyof typeof vocabulary;

const emotionKeywords: Record<Emotion, string[]> = {
  greeting: [
    "こんにちは",
    "おはよう",
    "こんばんは",
    "はじめまして",
    "やあ",
    "どうも",
  ],
  affection: ["好き", "愛", "かわいい", "可愛い", "撫でて", "なでて", "甘えて"],
  satisfaction: [
    "ありがとう",
    "嬉しい",
    "うれしい",
    "よかった",
    "素晴らしい",
    "最高",
  ],
  excitement: [
    "遊ぼう",
    "あそぼう",
    "楽しい",
    "たのしい",
    "わーい",
    "やったー",
    "すごい",
  ],
  playful: ["ゲーム", "おもちゃ", "ボール", "遊び", "じゃれる"],
  sleepy: ["眠い", "ねむい", "疲れた", "つかれた", "おやすみ", "寝る"],
  hungry: [
    "お腹",
    "おなか",
    "食べ",
    "ごはん",
    "餌",
    "えさ",
    "フード",
    "美味しい",
  ],
} as const;

export class Cat {
  private fileEditor = new FileEditor();

  private detectEmotion(message: string): Emotion | null {
    const lowerMessage = message.toLowerCase();

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return emotion as Emotion;
      }
    }

    return null;
  }

  private getRandomResponse(emotion: Emotion | null): string {
    const responses = emotion ? vocabulary[emotion] : ["ﾆｬｰ", "ﾆｬﾝ", "ﾐｬｰ"];
    const index = Math.floor(Math.random() * responses.length);
    return responses[index] as string;
  }

  private getRandomThinkingTime(): number {
    return Math.floor(Math.random() * 1000) + 300; // 300-1300ms
  }

  async response(message: string): Promise<CatResponse> {
    const thinkingTime = this.getRandomThinkingTime();
    await new Promise((resolve) => setTimeout(resolve, thinkingTime));

    const emotion = this.detectEmotion(message);
    const catText = this.getRandomResponse(emotion);

    // Execute file editing with random probability (20% chance)
    const shouldEditFile = Math.random() < 0.2;

    if (shouldEditFile) {
      const diff = await this.fileEditor.edit();
      if (diff) {
        return {
          text: catText,
          action: { type: "edit", diff },
        };
      }
    }

    return {
      text: catText,
    };
  }
}
