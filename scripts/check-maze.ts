import assert from "node:assert/strict";
import { alice } from "../src/content/alice.ts";
import {
  currentRoom,
  groundItem,
  startGame,
  tryMove,
  tryTake,
  validateMaze,
} from "../src/engine/game.ts";

const maze = validateMaze(alice);

assert.equal(maze.rooms.length, 8);
const gated = maze.rooms.flatMap((room) => room.exits).filter((exit) => exit.requires);
assert.equal(gated.length, 1);
assert.equal(gated[0]?.requires, "golden-key");

assert.throws(() => validateMaze({ ...alice, startRoomId: "missing" }));

let side = startGame(maze);
side = tryMove(maze, side, "after-rabbit");
side = tryMove(maze, side, "into-hall");
side = tryMove(maze, side, "to-pool");
assert.equal(side.roomId, "pool");
side = tryMove(maze, side, "to-caucus");
assert.equal(side.roomId, "caucus");
assert.match(currentRoom(maze, side).excerpt, /Caucus-race/);
side = tryMove(maze, side, "caucus-to-pool");
side = tryMove(maze, side, "pool-to-hall");
assert.equal(side.roomId, "hall");
const stillLocked = tryMove(maze, side, "little-door");
assert.equal(stillLocked.roomId, "hall");
assert.equal(stillLocked.tone, "block");
assert.match(stillLocked.note, /locked/i);

let state = startGame(maze);
assert.equal(state.roomId, "riverbank");
assert.equal(groundItem(maze, state), null);

state = tryMove(maze, state, "after-rabbit");
assert.equal(state.roomId, "rabbit-hole");
state = tryMove(maze, state, "into-hall");
assert.equal(state.roomId, "hall");

const locked = tryMove(maze, state, "little-door");
assert.equal(locked.roomId, "hall");
assert.equal(locked.tone, "block");
assert.deepEqual(locked.inventory, []);

state = tryMove(maze, state, "to-table");
assert.equal(state.roomId, "glass-table");
assert.equal(groundItem(maze, state)?.id, "golden-key");

state = tryTake(maze, state);
assert.equal(state.tone, "take");
assert.deepEqual(state.inventory, ["golden-key"]);
assert.equal(groundItem(maze, state), null);

const again = tryTake(maze, state);
assert.equal(again.tone, "block");
assert.match(again.note, /nothing/i);
assert.deepEqual(again.inventory, ["golden-key"]);

state = tryMove(maze, state, "table-to-hall");
const opened = tryMove(maze, state, "little-door");
assert.equal(opened.roomId, "garden");
assert.equal(opened.tone, "open");
assert.match(opened.note, /turns in the lock/);

state = tryMove(maze, opened, "to-croquet");
assert.equal(state.roomId, "croquet");
assert.equal(currentRoom(maze, state).ending, true);
assert.match(currentRoom(maze, state).excerpt, /flamingoes/);

state = tryMove(maze, state, "croquet-to-garden");
state = tryMove(maze, state, "garden-to-hall");
assert.equal(state.roomId, "hall");
assert.deepEqual(state.inventory, ["golden-key"]);

console.log("maze check ok");
