import type { MazeDef } from "../engine/types.ts";

/**
 * Sample maze. Room excerpts are Wu Cheng'en's words from the Chinese
 * Wikisource transcription of 《西遊記》 (traditional characters).
 * A verse description between the iron bridge and the stone tablet is not
 * included; the prose itself is not rewritten.
 * Exit labels, the staff, and the gated fight are the maze, not the novel.
 */
const copy = {
  domain: "公有領域",
  exits: "去路",
  inventory: "隨身",
  empty: "身上什麼也沒帶。",
  take: "拾取",
  ending: "樣例末景",
  moveHint: "選路",
  takeHint: "拾取",
  cantGo: "那邊走不通。",
  nothing: "這裡沒有可拾的東西。",
  took: "你拾起{name}。",
  unlocked: "{name}在手，路開了。",
  needs: "須持{name}",
  fits: "路已開",
} as const;

export const xiyou = {
  id: "xiyou",
  title: "西遊記",
  author: "吳承恩",
  source:
    "原文取自吳承恩《西遊記》（明代長篇小說，公有領域）。引文依維基文庫《西遊記》第一回、第三回、第五回，繁體，未改寫；兩段之間略去一則韻文。去路、金箍棒與關卡是迷宮，不是小說正文。litmaze 不生成故事。",
  copy,
  startRoomId: "huaguo",
  items: [
    {
      id: "ruyi-bang",
      name: "如意金箍棒",
      note: "兩頭金箍，中間烏鐵。重一萬三千五百斤。",
    },
  ],
  rooms: [
    {
      id: "huaguo",
      title: "花果山",
      chapter: "第一回 · 靈根育孕源流出",
      excerpt: `海外有一國土，名曰傲來國。國近大海，海中有一座名山，喚為花果山。此山乃十洲之祖脈，三島之來龍，自開清濁而立，鴻濛判後而成。`,
      exits: [
        { id: "to-stone", label: "去看山頂那塊仙石", to: "xianshi" },
      ],
    },
    {
      id: "xianshi",
      title: "仙石",
      chapter: "第一回 · 靈根育孕源流出",
      excerpt: `那座山正當頂上，有一塊仙石。其石有三丈六尺五寸高，有二丈四尺圍圓。三丈六尺五寸高，按周天三百六十五度；二丈四尺圍圓，按政曆二十四氣。上有九竅八孔，按九宮八卦。四面更無樹木遮陰，左右倒有芝蘭相襯。蓋自開闢以來，每受天真地秀，日精月華，感之既久，遂有靈通之意。內育仙胞，一日迸裂，產一石卵，似圓毬樣大。因見風，化作一個石猴，五官俱備，四肢皆全。便就學爬學走，拜了四方。`,
      exits: [
        { id: "to-falls", label: "隨眾猴順澗尋水源", to: "pubu" },
        { id: "back-mountain", label: "回到山前", to: "huaguo" },
      ],
    },
    {
      id: "pubu",
      title: "瀑布飛泉",
      chapter: "第一回 · 靈根育孕源流出",
      excerpt: `一群猴子耍了一會，卻去那山澗中洗澡。見那股澗水奔流，真個似滾瓜湧濺。古云：「禽有禽言，獸有獸語。」眾猴都道：「這股水不知是那裡的水。我們今日趕閑無事，順澗邊往上溜頭尋看源流，耍子去耶！」喊一聲，都拖男挈女，呼弟呼兄，一齊跑來，順澗爬山，直至源流之處，乃是一股瀑布飛泉。但見那：

一派白虹起，千尋雪浪飛。
海風吹不斷，江月照還依。
冷氣分青嶂，餘流潤翠微。
潺湲名瀑布，真似掛簾帷。

眾猴拍手稱揚道：「好水，好水！原來此處遠通山腳之下，直接大海之波。」又道：「那一個有本事的，鑽進去尋個源頭出來，不傷身體者，我等即拜他為王。」連呼了三聲，忽見叢雜中跳出一個石猴，應聲高叫道：「我進去，我進去。」`,
      exits: [
        { id: "into-cave", label: "學石猴跳進瀑布", to: "shuilian" },
        { id: "back-stone", label: "退回仙石旁", to: "xianshi" },
      ],
    },
    {
      id: "shuilian",
      title: "水簾洞",
      chapter: "第一回 · 靈根育孕源流出",
      excerpt: `你看他瞑目蹲身，將身一縱，徑跳入瀑布泉中，忽睜睛擡頭觀看，那裡邊卻無水無波，明明朗朗的一架橋梁。他住了身，定了神，仔細再看，原來是座鐵板橋。橋下之水，沖貫於石竅之間，倒掛流出去，遮閉了橋門。卻又欠身上橋頭，再走再看，卻似有人家住處一般，真個好所在。

看罷多時，跳過橋中間，左右觀看。只見正當中有一石碣，碣上有一行楷書大字，鐫著「花果山福地，水簾洞洞天」。`,
      exits: [
        {
          id: "to-battle",
          label: "出洞迎戰天兵",
          to: "tianbing",
          requires: "ruyi-bang",
          lockedText: "洞外天兵罵戰。手裡沒有如意金箍棒，出不得這鐵板橋。",
        },
        {
          id: "to-dragon",
          label: "從橋下潛入東海龍宮",
          to: "longgong",
        },
        {
          id: "to-master",
          label: "辭了眾猴，去訪仙",
          to: "lingtai",
        },
        { id: "out-falls", label: "跳出瀑布", to: "pubu" },
      ],
    },
    {
      id: "longgong",
      title: "東海龍宮",
      chapter: "第三回 · 四海千山皆拱伏",
      itemId: "ruyi-bang",
      itemPlace: "海藏裡金光萬道，一根如意金箍棒可以拿起。",
      excerpt: `龍王果引導至海藏中間，忽見金光萬道。龍王指定道：「那放光的便是。」悟空撩衣上前，摸了一把，乃是一根鐵柱子，約有斗來粗，二丈有餘長。他儘力兩手撾過道：「忒粗忒長些，再短細些方可用。」說畢，那寶貝就短了幾尺，細了一圍。悟空又顛一顛道：「再細些更好。」那寶貝真個又細了幾分。悟空十分歡喜，拿出海藏看時，原來兩頭是兩個金箍，中間乃一段烏鐵。緊挨箍有鐫成的一行字，喚做：「如意金箍棒，重一萬三千五百斤。」`,
      exits: [
        { id: "back-cave", label: "分開水道，回水簾洞", to: "shuilian" },
      ],
    },
    {
      id: "lingtai",
      title: "靈臺方寸山",
      chapter: "第一回 · 靈根育孕源流出",
      excerpt: `又見那洞門緊閉，靜悄悄杳無人跡。忽回頭，見崖頭立一石碑，約有三丈餘高，八尺餘闊，上有一行十個大字，乃是「靈臺方寸山，斜月三星洞」。美猴王十分歡喜道：「此間人果是樸實，果有此山此洞。」`,
      exits: [
        { id: "back-from-master", label: "回到水簾洞", to: "shuilian" },
      ],
    },
    {
      id: "tianbing",
      title: "洞外大戰",
      chapter: "第五回 · 亂蟠桃大聖偷丹",
      ending: true,
      excerpt: `這大聖一條棒，抵住了四大天神與李托塔、哪吒太子，俱在半空中，殺勾多時，大聖見天色將晚，即拔毫毛一把，丟在口中，嚼碎了，噴將出去，叫聲：「變！」就變了千百個大聖，都使的是金箍棒，打退了哪吒太子，戰敗了五個天王。`,
      exits: [
        { id: "back-in", label: "收了神通，回洞", to: "shuilian" },
      ],
    },
  ],
} satisfies MazeDef;
