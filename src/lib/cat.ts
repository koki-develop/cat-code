import type { Action, CatConfig } from "../components/types";
import { FileEditor } from "./fileEditor";

export type CatResponse = {
  text: string;
  action?: Action;
};

const vocabulary = {
  greeting: ["ﾆｬｯ", "ﾐｬｯ", "ﾆｬ", "ﾆｬ~ﾝ", "ﾐｬｰｵ"],
  affection: ["ﾆｬｵ~ﾝ", "ﾐｬｵ~", "ﾆｬﾝﾆｬﾝ", "ﾆｬ~ﾝ♡", "ﾐｬｰｵ~ﾝ", "ﾌﾆｬ~ﾝ"],
  satisfaction: ["ｺﾞﾛｺﾞﾛ", "ﾆｬ~", "ﾌﾆｬ~", "ﾆｬ~ﾝ♪", "ｺﾞﾛｺﾞﾛﾆｬ~"],
  excitement: ["ﾆｬﾆｬﾆｬ!", "ﾐｬｰ!", "ﾆｬｯﾆｬｯ", "ﾆｬｰ!!", "ﾐｬｵ!!", "ﾆｬﾆｬ!!"],
  playful: ["ﾆｬｰﾝ", "ﾐｬﾐｬ", "ﾆｬｵｯ", "ﾆｬｰﾝ♪", "ﾐｬｰﾝ", "ﾆｬﾆｬ~ﾝ"],
  sleepy: ["ﾆｬ…", "ﾌﾆｬ~", "ﾆｬ~ﾝ", "ﾐｬ…", "ﾌﾆｬ…", "ﾆｬｧ~", "ﾌﾞﾆｬ~"],
  hungry: ["ﾆｬｵｫﾝ", "ﾐｬｰｵ", "ﾆｬﾝﾆｬﾝ!", "ﾆｬｰｵ!!", "ﾐｬｵｫﾝ!", "ﾆｬﾝﾆｬｰｵ"],
  annoyed: ["ﾌｰｯ", "ﾌﾆｬｰ", "ﾌｼｬｰ", "ﾌﾞｯ", "ﾌﾞﾆｬｰ"],
  curious: ["ﾆｬ?", "ﾐｬ?", "ﾆｬｰ?", "ﾐｬｰ?", "ﾆｬｯ?", "ﾆｬﾝ?"],
  surprised: ["ﾆｬ!?", "ﾐｬ!!", "ﾆｬｰ!?", "ﾆｬｯ!!", "ﾐｬｵ!?", "ﾆｬﾝ!?"],
  confused: ["ﾆｬ…?", "ﾐｬ~?", "ﾆｬﾝ…", "ﾆｬｰ…", "ﾐｬｰ…?"],
  demanding: ["ﾆｬｰｵ!", "ﾐｬｰ!", "ﾆｬｯ!", "ﾆｬｰ!!", "ﾐｬｵ!", "ﾆｬﾝ!"],
  content: ["ﾆｬ~", "ﾌﾆｬ~", "ﾐｬ~", "ﾆｬ~ﾝ"],
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
    "hello",
    "hi",
    "おつかれ",
    "お疲れ",
  ],
  affection: [
    "好き",
    "愛",
    "かわいい",
    "可愛い",
    "撫でて",
    "なでて",
    "甘えて",
    "抱っこ",
    "だっこ",
    "優しい",
    "いとしい",
    "愛おしい",
  ],
  satisfaction: [
    "ありがとう",
    "嬉しい",
    "うれしい",
    "よかった",
    "素晴らしい",
    "最高",
    "満足",
    "気持ちいい",
    "きもちいい",
    "幸せ",
    "しあわせ",
  ],
  excitement: [
    "遊ぼう",
    "あそぼう",
    "楽しい",
    "たのしい",
    "わーい",
    "やったー",
    "すごい",
    "わくわく",
    "ドキドキ",
    "興奮",
    "テンション",
  ],
  playful: [
    "ゲーム",
    "おもちゃ",
    "ボール",
    "遊び",
    "じゃれる",
    "追いかけ",
    "キャッチ",
    "隠れんぼ",
    "いたずら",
    "運動",
  ],
  sleepy: [
    "眠い",
    "ねむい",
    "疲れた",
    "つかれた",
    "おやすみ",
    "寝る",
    "だるい",
    "休憩",
    "昼寝",
    "ひるね",
    "お昼寝",
  ],
  hungry: [
    "お腹",
    "おなか",
    "食べ",
    "ごはん",
    "餌",
    "えさ",
    "フード",
    "美味しい",
    "おいしい",
    "空腹",
    "腹ペコ",
    "はらぺこ",
    "お菓子",
    "おかし",
  ],
  annoyed: [
    "うるさい",
    "やめて",
    "嫌",
    "いや",
    "だめ",
    "ダメ",
    "むかつく",
    "イライラ",
    "怒",
    "腹立つ",
    "しつこい",
    "邪魔",
    "じゃま",
  ],
  curious: [
    "何",
    "なに",
    "どう",
    "どこ",
    "いつ",
    "誰",
    "だれ",
    "なぜ",
    "どうして",
    "気になる",
    "興味",
    "不思議",
    "ふしぎ",
    "?",
    "？",
  ],
  surprised: [
    "びっくり",
    "驚",
    "おどろ",
    "えっ",
    "えー",
    "まじ",
    "マジ",
    "うそ",
    "ウソ",
    "本当",
    "ほんとう",
    "ほんと",
    "信じられない",
    "!",
    "！",
  ],
  confused: [
    "わからない",
    "分からない",
    "意味不明",
    "理解できない",
    "混乱",
    "困った",
    "こまった",
    "どうしよう",
    "迷子",
    "まいご",
    "困惑",
  ],
  demanding: [
    "して",
    "やって",
    "欲しい",
    "ほしい",
    "頂戴",
    "ちょうだい",
    "くれ",
    "今すぐ",
    "いますぐ",
    "急いで",
    "いそいで",
    "早く",
    "はやく",
  ],
  content: [
    "満足",
    "落ち着",
    "おちつ",
    "平和",
    "へいわ",
    "安心",
    "あんしん",
    "リラックス",
    "穏やか",
    "おだやか",
    "のんびり",
    "ゆったり",
  ],
} as const;

export class Cat {
  private fileEditor: FileEditor;
  private safeMode: boolean;

  constructor(config: CatConfig) {
    this.safeMode = config.safeMode;
    this.fileEditor = new FileEditor({ safeMode: config.safeMode });
  }

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
          action: { type: "edit", diff, safeMode: this.safeMode },
        };
      }
    }

    return {
      text: catText,
    };
  }
}
