import type { GameState, MazeDef } from "../engine/types.ts";
import {
  currentRoom,
  groundItem,
  inventoryItems,
  listExits,
} from "../engine/game.ts";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Escape text, then turn balanced *asterisks* into emphasis. */
function inline(value: string): string {
  const parts = value.split("*");
  if (parts.length % 2 === 0) return esc(value);
  return parts
    .map((part, index) => (index % 2 === 1 ? `<em>${esc(part)}</em>` : esc(part)))
    .join("");
}

function paragraphHtml(paragraph: string, drop: boolean): string {
  const text = paragraph.replaceAll("\n", " ").trim();
  const lead = drop ? text.match(/^([A-Za-z])([\s\S]*)$/) : null;
  if (!lead) return `<p>${inline(text)}</p>`;
  return `<p><span class="drop">${esc(lead[1] ?? "")}</span>${inline(lead[2] ?? "")}</p>`;
}

function excerptHtml(excerpt: string): string {
  return excerpt
    .trim()
    .split(/\n\n+/)
    .map((paragraph, index) => paragraphHtml(paragraph, index === 0))
    .join("");
}

export function renderApp(root: HTMLElement, maze: MazeDef, state: GameState): void {
  const room = currentRoom(maze, state);
  const item = groundItem(maze, state);
  const exits = listExits(maze, state);
  const pockets = inventoryItems(maze, state);

  const ground = item
    ? `<p class="ground"><span>${esc(room.itemPlace ?? "")}</span><button type="button" class="take-btn" data-take>Take</button><kbd>T</kbd></p>`
    : "";

  const exitList = exits
    .map((exit, index) => {
      const key = index < 9 ? `<kbd>${index + 1}</kbd>` : "<span></span>";
      const tag = exit.tag
        ? `<span class="tag${exit.open ? " fits" : ""}">${esc(exit.tag)}</span>`
        : "";
      return `<li><button type="button" data-exit="${esc(exit.id)}" data-open="${exit.open ? "yes" : "no"}">${key}<span class="label">${esc(exit.label)}</span>${tag}</button></li>`;
    })
    .join("");

  const pocketList =
    pockets.length === 0
      ? `<p class="empty">Nothing in your pockets.</p>`
      : `<ul class="pockets">${pockets
          .map(
            (pocket) =>
              `<li><span class="item-name">${esc(pocket.name)}</span><span class="item-note">${esc(pocket.note)}</span></li>`,
          )
          .join("")}</ul>`;

  const ending = room.ending ? `<p class="end-mark">Last scene of the sample</p>` : "";

  root.innerHTML = `<div class="book">
    <header>
      <p class="brand">litmaze</p>
      <h1>${esc(maze.title)}</h1>
      <p class="by">${esc(maze.author)} · public domain</p>
    </header>
    <main>
      ${ending}
      <p class="chapter">${esc(room.chapter)}</p>
      <h2>${esc(room.title)}</h2>
      <p class="note ${state.tone}" aria-live="polite">${esc(state.note)}</p>
      ${ground}
      <blockquote class="excerpt">${excerptHtml(room.excerpt)}</blockquote>
    </main>
    <aside>
      <div class="rail">
        <section>
          <h3>Exits</h3>
          <ol class="exits">${exitList}</ol>
        </section>
        <section>
          <h3>Inventory</h3>
          ${pocketList}
        </section>
        <p class="help"><kbd>1</kbd>–<kbd>9</kbd> move · <kbd>T</kbd> take</p>
      </div>
    </aside>
    <footer><p>${esc(maze.source)}</p></footer>
  </div>`;
}
