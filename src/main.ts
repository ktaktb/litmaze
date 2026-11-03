import { xiyou } from "./content/xiyou.ts";
import {
  listExits,
  startGame,
  tryMove,
  tryTake,
  validateMaze,
} from "./engine/game.ts";
import type { GameState } from "./engine/types.ts";
import { renderApp } from "./ui/render.ts";
import "./style.css";

const root = document.querySelector("#app");
if (!(root instanceof HTMLElement)) throw new Error("Missing #app");
const app: HTMLElement = root;

const maze = validateMaze(xiyou);
let state: GameState = startGame(maze);

function draw(): void {
  renderApp(app, maze, state);
  const roomTitle = app.querySelector("h2")?.textContent ?? maze.title;
  document.title = `${roomTitle} · litmaze`;
}

app.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  if (target.closest("[data-take]")) {
    state = tryTake(maze, state);
    draw();
    return;
  }

  const exitEl = target.closest("[data-exit]");
  if (!(exitEl instanceof HTMLElement)) return;
  const exitId = exitEl.dataset.exit;
  if (!exitId) return;
  state = tryMove(maze, state, exitId);
  draw();
});

window.addEventListener("keydown", (event) => {
  if (event.repeat || event.metaKey || event.ctrlKey || event.altKey) return;
  const key = event.key.toLowerCase();

  if (key === "t") {
    event.preventDefault();
    state = tryTake(maze, state);
    draw();
    return;
  }

  if (/^[1-9]$/.test(key)) {
    const exit = listExits(maze, state)[Number(key) - 1];
    if (!exit) return;
    event.preventDefault();
    state = tryMove(maze, state, exit.id);
    draw();
  }
});

draw();
