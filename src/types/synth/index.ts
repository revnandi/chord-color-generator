export type NoteVariation = "all" | "onlyWhite";

export type Note = {
  name: string,
  freq: number
};

export type Key = {
  [key: string]: Note
}
;
export type Notes = {
  all: Key,
  onlyWhite: Key
};