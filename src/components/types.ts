export type Action = EditAction;

export type EditAction = {
  type: "edit";
  diff: FileDiff;
};

export type FileDiff = {
  fileName: string;
  diffs: Diff[];
};

export type Diff = {
  rowNumber: number;
  a: string;
  b: string;
};

export type Message = {
  id: number;
  text: string;
  sender: "user" | "cat";
  action?: Action;
};
