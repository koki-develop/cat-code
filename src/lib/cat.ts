type CatVocabulary = {
  [key: string]: string[];
};

type EmotionKeywords = {
  [key: string]: string[];
};

export class Cat {
  private vocabulary: CatVocabulary = {
    greeting: ["ﾆｬｯ", "ﾐｬｯ", "ﾆｬ"],
    affection: ["ﾆｬｵ~ﾝ", "ﾐｬｵ~", "ﾆｬﾝﾆｬﾝ"],
    satisfaction: ["ｺﾞﾛｺﾞﾛ", "ﾆｬ~"],
    excitement: ["ﾆｬﾆｬﾆｬ!", "ﾐｬｰ!", "ﾆｬｯﾆｬｯ"],
    playful: ["ﾆｬｰﾝ", "ﾐｬﾐｬ", "ﾆｬｵｯ"],
    sleepy: ["ﾆｬ…", "ﾌﾆｬ~", "ﾆｬ~ﾝ"],
    hungry: ["ﾆｬｵｫﾝ", "ﾐｬｰｵ", "ﾆｬﾝﾆｬﾝ!"],
    default: ["ﾆｬｰ", "ﾆｬﾝ", "ﾐｬｰ"],
  };

  private emotionKeywords: EmotionKeywords = {
    greeting: [
      "こんにちは",
      "おはよう",
      "こんばんは",
      "はじめまして",
      "やあ",
      "どうも",
    ],
    affection: [
      "好き",
      "愛",
      "かわいい",
      "可愛い",
      "撫でて",
      "なでて",
      "甘えて",
    ],
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
  };

  private detectEmotion(message: string): string {
    const lowerMessage = message.toLowerCase();

    for (const [emotion, keywords] of Object.entries(this.emotionKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        return emotion;
      }
    }

    return "default";
  }

  private getRandomResponse(emotion: string): string {
    const responses = this.vocabulary[emotion] || this.vocabulary.default;
    if (!responses || responses.length === 0) {
      return "ﾆｬｰ";
    }
    const index = Math.floor(Math.random() * responses.length);
    return responses[index] as string;
  }

  private getRandomThinkingTime(): number {
    return Math.floor(Math.random() * 1000) + 300; // 300-1300ms
  }

  async response(message: string): Promise<string> {
    const thinkingTime = this.getRandomThinkingTime();
    await new Promise((resolve) => setTimeout(resolve, thinkingTime));

    const emotion = this.detectEmotion(message);
    return this.getRandomResponse(emotion);
  }
}
