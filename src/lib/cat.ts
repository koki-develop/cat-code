export class Cat {
  async response(_message: string): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return "ﾆｬｰ";
  }
}
