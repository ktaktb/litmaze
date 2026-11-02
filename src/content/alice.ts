import type { MazeDef } from "../engine/types.ts";

/**
 * Sample maze. Each excerpt is Lewis Carroll's prose (public domain, 1865).
 * Exit labels, the key, and the locked door are the maze laid over that text.
 */
export const alice = {
  id: "alice",
  title: "Alice’s Adventures in Wonderland",
  author: "Lewis Carroll",
  source:
    "Excerpts from Lewis Carroll, Alice’s Adventures in Wonderland (1865), public domain. Wording follows Project Gutenberg eBook #11. Exit labels are the maze, not the novel. litmaze does not generate story text.",
  startRoomId: "riverbank",
  items: [
    {
      id: "golden-key",
      name: "tiny golden key",
      note: "Too small for the hall doors. It might fit a smaller lock.",
    },
  ],
  rooms: [
    {
      id: "riverbank",
      title: "The Riverbank",
      chapter: "Chapter I · Down the Rabbit-Hole",
      excerpt: `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, “and what is the use of a book,” thought Alice “without pictures or conversations?”

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so *very* remarkable in that; nor did Alice think it so *very* much out of the way to hear the Rabbit say to itself, “Oh dear! Oh dear! I shall be late!” (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually *took a watch out of its waistcoat-pocket*, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`,
      exits: [
        {
          id: "after-rabbit",
          label: "Run after the White Rabbit",
          to: "rabbit-hole",
        },
      ],
    },
    {
      id: "rabbit-hole",
      title: "Down the Rabbit-Hole",
      chapter: "Chapter I · Down the Rabbit-Hole",
      excerpt: `The rabbit-hole went straight on like a tunnel for some way, and then dipped suddenly down, so suddenly that Alice had not a moment to think about stopping herself before she found herself falling down a very deep well.

Either the well was very deep, or she fell very slowly, for she had plenty of time as she went down to look about her and to wonder what was going to happen next. First, she tried to look down and make out what she was coming to, but it was too dark to see anything; then she looked at the sides of the well, and noticed that they were filled with cupboards and book-shelves; here and there she saw maps and pictures hung upon pegs. She took down a jar from one of the shelves as she passed; it was labelled “ORANGE MARMALADE”, but to her great disappointment it was empty: she did not like to drop the jar for fear of killing somebody underneath, so managed to put it into one of the cupboards as she fell past it.`,
      exits: [
        { id: "into-hall", label: "Land in the long hall", to: "hall" },
        {
          id: "up-the-well",
          label: "Climb back toward the bank",
          to: "riverbank",
        },
      ],
    },
    {
      id: "hall",
      title: "The Hall of Doors",
      chapter: "Chapter I · Down the Rabbit-Hole",
      excerpt: `Alice was not a bit hurt, and she jumped up on to her feet in a moment: she looked up, but it was all dark overhead; before her was another long passage, and the White Rabbit was still in sight, hurrying down it. There was not a moment to be lost: away went Alice like the wind, and was just in time to hear it say, as it turned a corner, “Oh my ears and whiskers, how late it’s getting!” She was close behind it when she turned the corner, but the Rabbit was no longer to be seen: she found herself in a long, low hall, which was lit up by a row of lamps hanging from the roof.

There were doors all round the hall, but they were all locked; and when Alice had been all the way down one side and up the other, trying every door, she walked sadly down the middle, wondering how she was ever to get out again.`,
      exits: [
        {
          id: "little-door",
          label: "The little door behind the curtain",
          to: "garden",
          requires: "golden-key",
          lockedText:
            "The little door is locked. It looks as if a tiny golden key might fit.",
        },
        {
          id: "to-table",
          label: "Toward the little glass table",
          to: "glass-table",
        },
        {
          id: "to-pool",
          label: "Down toward the pool of tears",
          to: "pool",
        },
        {
          id: "back-passage",
          label: "Back along the passage",
          to: "rabbit-hole",
        },
      ],
    },
    {
      id: "glass-table",
      title: "The Glass Table",
      chapter: "Chapter I · Down the Rabbit-Hole",
      itemId: "golden-key",
      itemPlace: "A tiny golden key lies on the glass table.",
      excerpt: `Suddenly she came upon a little three-legged table, all made of solid glass; there was nothing on it except a tiny golden key, and Alice’s first thought was that it might belong to one of the doors of the hall; but, alas! either the locks were too large, or the key was too small, but at any rate it would not open any of them. However, on the second time round, she came upon a low curtain she had not noticed before, and behind it was a little door about fifteen inches high: she tried the little golden key in the lock, and to her great delight it fitted!`,
      exits: [
        { id: "table-to-hall", label: "Back to the doors", to: "hall" },
      ],
    },
    {
      id: "pool",
      title: "The Pool of Tears",
      chapter: "Chapter II · The Pool of Tears",
      excerpt: `However, she soon made out that she was in the pool of tears which she had wept when she was nine feet high.

“I wish I hadn’t cried so much!” said Alice, as she swam about, trying to find her way out. “I shall be punished for it now, I suppose, by being drowned in my own tears! That *will* be a queer thing, to be sure! However, everything is queer to-day.”`,
      exits: [
        {
          id: "to-caucus",
          label: "Swim toward the crowd on the shore",
          to: "caucus",
        },
        { id: "pool-to-hall", label: "Wade back up to the hall", to: "hall" },
      ],
    },
    {
      id: "caucus",
      title: "A Caucus-Race",
      chapter: "Chapter III · A Caucus-Race and a Long Tale",
      excerpt: `“What I was going to say,” said the Dodo in an offended tone, “was, that the best thing to get us dry would be a Caucus-race.”

“What *is* a Caucus-race?” said Alice; not that she wanted much to know, but the Dodo had paused as if it thought that *somebody* ought to speak, and no one else seemed inclined to say anything.

“Why,” said the Dodo, “the best way to explain it is to do it.” (And, as you might like to try the thing yourself, some winter day, I will tell you how the Dodo managed it.)

First it marked out a race-course, in a sort of circle, (“the exact shape doesn’t matter,” it said,) and then all the party were placed along the course, here and there. There was no “One, two, three, and away,” but they began running when they liked, and left off when they liked, so that it was not easy to know when the race was over. However, when they had been running half an hour or so, and were quite dry again, the Dodo suddenly called out “The race is over!” and they all crowded round it, panting, and asking, “But who has won?”

This question the Dodo could not answer without a great deal of thought, and it sat for a long time with one finger pressed upon its forehead (the position in which you usually see Shakespeare, in the pictures of him), while the rest waited in silence. At last the Dodo said, “*Everybody* has won, and all must have prizes.”`,
      exits: [
        {
          id: "caucus-to-pool",
          label: "Slip back into the pool",
          to: "pool",
        },
      ],
    },
    {
      id: "garden",
      title: "The Beautiful Garden",
      chapter: "Chapter VII",
      excerpt: `Once more she found herself in the long hall, and close to the little glass table. “Now, I’ll manage better this time,” she said to herself, and began by taking the little golden key, and unlocking the door that led into the garden. Then she went to work nibbling at the mushroom (she had kept a piece of it in her pocket) till she was about a foot high: then she walked down the little passage: and *then*—she found herself at last in the beautiful garden, among the bright flower-beds and the cool fountains.`,
      exits: [
        {
          id: "to-croquet",
          label: "Follow the Queen’s shout",
          to: "croquet",
        },
        {
          id: "garden-to-hall",
          label: "Return through the little door",
          to: "hall",
        },
      ],
    },
    {
      id: "croquet",
      title: "The Queen’s Croquet-Ground",
      chapter: "Chapter VIII · The Queen’s Croquet-Ground",
      ending: true,
      excerpt: `“Get to your places!” shouted the Queen in a voice of thunder, and people began running about in all directions, tumbling up against each other; however, they got settled down in a minute or two, and the game began. Alice thought she had never seen such a curious croquet-ground in her life; it was all ridges and furrows; the balls were live hedgehogs, the mallets live flamingoes, and the soldiers had to double themselves up and to stand on their hands and feet, to make the arches.`,
      exits: [
        {
          id: "croquet-to-garden",
          label: "Step back among the flower-beds",
          to: "garden",
        },
      ],
    },
  ],
} satisfies MazeDef;
