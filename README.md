# litmaze

Public-domain novels as playable text mazes. A room is a scene, and its page is an excerpt of the original book. An exit is a move. A key in your inventory opens a door that was shut.

You walk and read. Nothing in this app writes story text. There is no language model.

The sample is a short maze through Lewis Carroll’s *Alice’s Adventures in Wonderland* (1865), which is in the public domain. The excerpts are Carroll’s words. The exits, the key, and the locked door are the game.

## Run

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Play

You start on the riverbank.

- Read the excerpt.
- Leave by an exit: click it, or press `1`–`9`.
- Press `T`, or click **Take**, to pick something up. Inventory is the margin on the right (below the page on a narrow screen).
- The little door in the hall stays locked until you hold the tiny golden key. The key is on the glass table.
- The sample’s last scene is the Queen’s croquet-ground. You can walk back out.

Refresh the page to start over.

`npm run check` walks the maze in Node (the side path, the locked door, the key, and the ending) without a browser.

## Build

```bash
npm install
npm run build
npm run preview
```

## Layout

- `src/engine` — move, take, and gates
- `src/content/alice.ts` — rooms, exits, and the key
- `src/ui` — the page

Another book would be another module shaped like `alice.ts`. The engine does not know about Alice.
