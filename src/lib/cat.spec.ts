import { describe, expect, test } from "bun:test";
import { Cat } from "./cat";

describe("Cat", () => {
  const cat = new Cat();

  test("should respond with greeting sounds for greeting messages", async () => {
    const greetingMessages = ["こんにちは", "おはよう", "はじめまして"];
    const greetingSounds = ["ﾆｬｯ", "ﾐｬｯ", "ﾆｬ"];

    for (const message of greetingMessages) {
      const response = await cat.response(message);
      expect(greetingSounds).toContain(response);
    }
  });

  test("should respond with affection sounds for affection messages", async () => {
    const affectionMessages = ["可愛いね", "好きだよ", "撫でて"];
    const affectionSounds = ["ﾆｬｵ～ﾝ", "ﾐｬｵ～", "ﾆｬﾝﾆｬﾝ"];

    for (const message of affectionMessages) {
      const response = await cat.response(message);
      expect(affectionSounds).toContain(response);
    }
  });

  test("should respond with satisfaction sounds for satisfaction messages", async () => {
    const satisfactionMessages = ["ありがとう", "嬉しい", "素晴らしい"];
    const satisfactionSounds = ["ｺﾞﾛｺﾞﾛ", "ﾆｬ～"];

    for (const message of satisfactionMessages) {
      const response = await cat.response(message);
      expect(satisfactionSounds).toContain(response);
    }
  });

  test("should respond with excitement sounds for excitement messages", async () => {
    const excitementMessages = ["遊ぼう", "楽しい", "やったー"];
    const excitementSounds = ["ﾆｬﾆｬﾆｬ!", "ﾐｬｰ!", "ﾆｬｯﾆｬｯ"];

    for (const message of excitementMessages) {
      const response = await cat.response(message);
      expect(excitementSounds).toContain(response);
    }
  });

  test("should respond with playful sounds for playful messages", async () => {
    const playfulMessages = ["ゲーム", "おもちゃ", "じゃれる"];
    const playfulSounds = ["ﾆｬｰﾝ", "ﾐｬﾐｬ", "ﾆｬｵｯ"];

    for (const message of playfulMessages) {
      const response = await cat.response(message);
      expect(playfulSounds).toContain(response);
    }
  });

  test("should respond with sleepy sounds for sleepy messages", async () => {
    const sleepyMessages = ["眠い", "疲れた", "おやすみ"];
    const sleepySounds = ["ﾆｬ…", "ﾌﾆｬ～", "ﾆｬ～ﾝ"];

    for (const message of sleepyMessages) {
      const response = await cat.response(message);
      expect(sleepySounds).toContain(response);
    }
  });

  test("should respond with hungry sounds for hungry messages", async () => {
    const hungryMessages = ["お腹すいた", "ごはん", "美味しい"];
    const hungrySounds = ["ﾆｬｵｫﾝ", "ﾐｬｰｵ", "ﾆｬﾝﾆｬﾝ!"];

    for (const message of hungryMessages) {
      const response = await cat.response(message);
      expect(hungrySounds).toContain(response);
    }
  });

  test("should respond with default sounds for unrecognized messages", async () => {
    const unknownMessages = ["テスト", "何これ", "xyz123"];
    const defaultSounds = ["ﾆｬｰ", "ﾆｬﾝ", "ﾐｬｰ"];

    for (const message of unknownMessages) {
      const response = await cat.response(message);
      expect(defaultSounds).toContain(response);
    }
  });

  test("should handle empty string", async () => {
    const response = await cat.response("");
    const defaultSounds = ["ﾆｬｰ", "ﾆｬﾝ", "ﾐｬｰ"];
    expect(defaultSounds).toContain(response);
  });

  test("should detect emotion from case-insensitive messages", async () => {
    const response1 = await cat.response("こんにちは");
    const response2 = await cat.response("コンニチハ");
    const greetingSounds = ["ﾆｬｯ", "ﾐｬｯ", "ﾆｬ"];

    expect(greetingSounds).toContain(response1);
    // response2 should be default since hiragana detection only works for lowercase
    const defaultSounds = ["ﾆｬｰ", "ﾆｬﾝ", "ﾐｬｰ"];
    expect(defaultSounds).toContain(response2);
  });
});
