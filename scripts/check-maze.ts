import assert from "node:assert/strict";
import { xiyou } from "../src/content/xiyou.ts";
import {
  currentRoom,
  groundItem,
  startGame,
  tryMove,
  tryTake,
  validateMaze,
} from "../src/engine/game.ts";

const maze = validateMaze(xiyou);

assert.equal(maze.rooms.length, 7);
assert.equal(maze.copy.exits, "去路");
assert.equal(maze.copy.take, "拾取");
const gated = maze.rooms.flatMap((room) => room.exits).filter((exit) => exit.requires);
assert.equal(gated.length, 1);
assert.equal(gated[0]?.requires, "ruyi-bang");

assert.throws(() => validateMaze({ ...xiyou, startRoomId: "missing" }));

let side = startGame(maze);
side = tryMove(maze, side, "to-stone");
side = tryMove(maze, side, "to-falls");
side = tryMove(maze, side, "into-cave");
assert.equal(side.roomId, "shuilian");
side = tryMove(maze, side, "to-master");
assert.equal(side.roomId, "lingtai");
assert.match(currentRoom(maze, side).excerpt, /斜月三星洞/);
side = tryMove(maze, side, "back-from-master");
assert.equal(side.roomId, "shuilian");
const stillLocked = tryMove(maze, side, "to-battle");
assert.equal(stillLocked.roomId, "shuilian");
assert.equal(stillLocked.tone, "block");
assert.match(stillLocked.note, /如意金箍棒/);

let state = startGame(maze);
assert.equal(state.roomId, "huaguo");
assert.match(currentRoom(maze, state).excerpt, /花果山/);
assert.equal(groundItem(maze, state), null);

state = tryMove(maze, state, "to-stone");
assert.equal(state.roomId, "xianshi");
state = tryMove(maze, state, "to-falls");
assert.equal(state.roomId, "pubu");
state = tryMove(maze, state, "into-cave");
assert.equal(state.roomId, "shuilian");

const locked = tryMove(maze, state, "to-battle");
assert.equal(locked.roomId, "shuilian");
assert.equal(locked.tone, "block");
assert.deepEqual(locked.inventory, []);

state = tryMove(maze, state, "to-dragon");
assert.equal(state.roomId, "longgong");
assert.equal(groundItem(maze, state)?.id, "ruyi-bang");

state = tryTake(maze, state);
assert.equal(state.tone, "take");
assert.equal(state.note, "你拾起如意金箍棒。");
assert.deepEqual(state.inventory, ["ruyi-bang"]);
assert.equal(groundItem(maze, state), null);

const again = tryTake(maze, state);
assert.equal(again.tone, "block");
assert.match(again.note, /沒有/);
assert.deepEqual(again.inventory, ["ruyi-bang"]);

state = tryMove(maze, state, "back-cave");
const opened = tryMove(maze, state, "to-battle");
assert.equal(opened.roomId, "tianbing");
assert.equal(opened.tone, "open");
assert.equal(opened.note, "如意金箍棒在手，路開了。");

state = opened;
assert.equal(currentRoom(maze, state).ending, true);
assert.match(currentRoom(maze, state).excerpt, /金箍棒/);

state = tryMove(maze, state, "back-in");
assert.equal(state.roomId, "shuilian");
assert.deepEqual(state.inventory, ["ruyi-bang"]);

console.log("maze check ok");
