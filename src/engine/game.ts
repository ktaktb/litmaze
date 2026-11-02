import type { ExitView, GameState, ItemDef, MazeDef, RoomDef } from "./types.ts";

function roomById(maze: MazeDef, id: string): RoomDef {
  const room = maze.rooms.find((candidate) => candidate.id === id);
  if (!room) throw new Error(`Unknown room "${id}".`);
  return room;
}

function itemById(maze: MazeDef, id: string): ItemDef {
  const item = maze.items.find((candidate) => candidate.id === id);
  if (!item) throw new Error(`Unknown item "${id}".`);
  return item;
}

/**
 * Rooms reachable from the start, picking up items along the way.
 * A new item can open a gate back in a room already visited, so those
 * rooms are walked again.
 */
function reachableRoomIds(maze: MazeDef): Set<string> {
  const owned = new Set<string>();
  const visited = new Set<string>();
  const queue: string[] = [maze.startRoomId];

  while (queue.length > 0) {
    const id = queue.shift();
    if (id === undefined) break;
    const room = roomById(maze, id);

    let pickedUp = false;
    if (!visited.has(id)) {
      visited.add(id);
      if (room.itemId && !owned.has(room.itemId)) {
        owned.add(room.itemId);
        pickedUp = true;
      }
    }

    if (pickedUp) {
      for (const seen of visited) queue.push(seen);
    }

    for (const exit of room.exits) {
      if (exit.requires && !owned.has(exit.requires)) continue;
      if (!visited.has(exit.to)) queue.push(exit.to);
    }
  }

  return visited;
}

/** Throw if ids, links, or gates would make the maze unplayable. */
export function validateMaze(maze: MazeDef): MazeDef {
  const roomIds = new Set<string>();
  for (const room of maze.rooms) {
    if (roomIds.has(room.id)) throw new Error(`Duplicate room id "${room.id}".`);
    roomIds.add(room.id);
    if (!room.title.trim()) throw new Error(`Room "${room.id}" needs a title.`);
    if (!room.chapter.trim()) throw new Error(`Room "${room.id}" needs a chapter.`);
    if (!room.excerpt.trim()) throw new Error(`Room "${room.id}" needs an excerpt.`);
    if (room.exits.length === 0) throw new Error(`Room "${room.id}" needs an exit.`);
  }

  if (!roomIds.has(maze.startRoomId)) {
    throw new Error(`Start room "${maze.startRoomId}" does not exist.`);
  }

  const itemIds = new Set<string>();
  for (const item of maze.items) {
    if (itemIds.has(item.id)) throw new Error(`Duplicate item id "${item.id}".`);
    itemIds.add(item.id);
    if (!item.name.trim()) throw new Error(`Item "${item.id}" needs a name.`);
  }

  const placed = new Map<string, string>();
  const exitIds = new Set<string>();
  for (const room of maze.rooms) {
    if (room.itemId) {
      if (!itemIds.has(room.itemId)) {
        throw new Error(`Room "${room.id}" offers unknown item "${room.itemId}".`);
      }
      if (!room.itemPlace?.trim()) {
        throw new Error(`Room "${room.id}" needs itemPlace for "${room.itemId}".`);
      }
      const prior = placed.get(room.itemId);
      if (prior) {
        throw new Error(`Item "${room.itemId}" is in both "${prior}" and "${room.id}".`);
      }
      placed.set(room.itemId, room.id);
    }

    for (const exit of room.exits) {
      if (exitIds.has(exit.id)) throw new Error(`Duplicate exit id "${exit.id}".`);
      exitIds.add(exit.id);
      if (!exit.label.trim()) throw new Error(`Exit "${exit.id}" needs a label.`);
      if (!roomIds.has(exit.to)) {
        throw new Error(`Exit "${exit.id}" leads to unknown room "${exit.to}".`);
      }
      if (exit.requires) {
        if (!itemIds.has(exit.requires)) {
          throw new Error(`Exit "${exit.id}" requires unknown item "${exit.requires}".`);
        }
        if (!exit.lockedText.trim()) {
          throw new Error(`Exit "${exit.id}" needs lockedText.`);
        }
      }
    }
  }

  for (const item of maze.items) {
    if (!placed.has(item.id)) {
      throw new Error(`Item "${item.id}" is never placed in a room.`);
    }
  }

  const reached = reachableRoomIds(maze);
  for (const room of maze.rooms) {
    if (!reached.has(room.id)) {
      throw new Error(`Room "${room.id}" is not reachable from the start.`);
    }
  }

  return maze;
}

export function startGame(maze: MazeDef): GameState {
  return {
    roomId: maze.startRoomId,
    inventory: [],
    taken: [],
    note: "",
    tone: "idle",
  };
}

export function currentRoom(maze: MazeDef, state: GameState): RoomDef {
  return roomById(maze, state.roomId);
}

export function groundItem(maze: MazeDef, state: GameState): ItemDef | null {
  const room = roomById(maze, state.roomId);
  if (!room.itemId) return null;
  if (state.taken.includes(room.itemId)) return null;
  return itemById(maze, room.itemId);
}

export function inventoryItems(maze: MazeDef, state: GameState): ItemDef[] {
  return state.inventory.map((id) => itemById(maze, id));
}

export function listExits(maze: MazeDef, state: GameState): ExitView[] {
  const room = roomById(maze, state.roomId);
  return room.exits.map((exit) => {
    if (!exit.requires) {
      return { id: exit.id, label: exit.label, open: true, tag: null };
    }
    const item = itemById(maze, exit.requires);
    const open = state.inventory.includes(exit.requires);
    return {
      id: exit.id,
      label: exit.label,
      open,
      tag: open ? "key fits" : `needs the ${item.name}`,
    };
  });
}

export function tryMove(maze: MazeDef, state: GameState, exitId: string): GameState {
  const room = roomById(maze, state.roomId);
  const exit = room.exits.find((candidate) => candidate.id === exitId);
  if (!exit) return { ...state, note: "You can't go that way.", tone: "block" };

  if (exit.requires && !state.inventory.includes(exit.requires)) {
    return { ...state, note: exit.lockedText, tone: "block" };
  }

  // Destination is checked at load; this guards a hand-built state.
  roomById(maze, exit.to);

  if (!exit.requires) {
    return { ...state, roomId: exit.to, note: "", tone: "idle" };
  }

  const item = itemById(maze, exit.requires);
  return {
    ...state,
    roomId: exit.to,
    note: `The ${item.name} turns in the lock.`,
    tone: "open",
  };
}

export function tryTake(maze: MazeDef, state: GameState): GameState {
  const item = groundItem(maze, state);
  if (!item) {
    return { ...state, note: "There is nothing here to take.", tone: "block" };
  }
  return {
    ...state,
    inventory: [...state.inventory, item.id],
    taken: [...state.taken, item.id],
    note: `You take the ${item.name}.`,
    tone: "take",
  };
}
