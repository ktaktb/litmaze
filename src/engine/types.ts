/** An object the player can carry. Gates name an item id. */
export interface ItemDef {
  id: string;
  /** Used in sentences: "You take the tiny golden key." */
  name: string;
  /** Shown under the name in the inventory. */
  note: string;
}

export interface OpenExit {
  id: string;
  label: string;
  to: string;
  requires?: undefined;
  lockedText?: undefined;
}

export interface GatedExit {
  id: string;
  label: string;
  to: string;
  /** Item id that must be in the inventory. */
  requires: string;
  /** Shown when the player tries this exit without the item. */
  lockedText: string;
}

export type ExitDef = OpenExit | GatedExit;

export interface RoomDef {
  id: string;
  title: string;
  /** Chapter label for the excerpt, e.g. "Chapter I · Down the Rabbit-Hole". */
  chapter: string;
  /**
   * Original prose. Blank lines separate paragraphs.
   * Asterisks mark italics: "so *very* remarkable".
   */
  excerpt: string;
  exits: ExitDef[];
  /** Item that can be picked up here, once. */
  itemId?: string;
  /** Sentence shown while that item is still in the room. */
  itemPlace?: string;
  /** Far end of a sample maze. The player can still leave. */
  ending?: boolean;
}

/** Player-facing strings. `{name}` is replaced with the item name. */
export interface MazeCopy {
  domain: string;
  exits: string;
  inventory: string;
  empty: string;
  take: string;
  ending: string;
  moveHint: string;
  takeHint: string;
  cantGo: string;
  nothing: string;
  took: string;
  unlocked: string;
  needs: string;
  fits: string;
}

export interface MazeDef {
  id: string;
  title: string;
  author: string;
  /** Citation shown in the page footer. */
  source: string;
  /** Labels and sentences. The engine does not pick a language. */
  copy: MazeCopy;
  startRoomId: string;
  items: ItemDef[];
  rooms: RoomDef[];
}

export type NoteTone = "idle" | "block" | "open" | "take";

export interface GameState {
  roomId: string;
  inventory: string[];
  /** Item ids removed from rooms, so they do not reappear. */
  taken: string[];
  note: string;
  tone: NoteTone;
}

export interface ExitView {
  id: string;
  label: string;
  open: boolean;
  /** Short status beside a gated exit, or null if the exit is always open. */
  tag: string | null;
}
