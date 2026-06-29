export const photos = {
  hero: "/assets/photos/travel-01.jpg",
  onsen: "/assets/photos/travel-02.jpg",
  street: "/assets/photos/travel-03.jpg",
  breakfast: "/assets/photos/travel-04.jpg",
  notebook: "/assets/photos/travel-05.jpg",
  cafe: "/assets/photos/travel-06.jpg"
};

export const navItems = [
  { label: "旅の記録", href: "/stories" },
  { label: "テーマ", href: "/themes" },
  { label: "つくる", href: "/create" },
  { label: "料金", href: "/pricing" },
  { label: "使い方", href: "/about" }
];

export const storyCards = [
  {
    title: "雨あがりの熱海で、湯けむりにほどける午後",
    href: "/stories/atami",
    image: photos.onsen,
    area: "静岡・熱海",
    date: "2泊3日",
    excerpt: "海沿いの宿、朝の喫茶店、坂道の小さな発見をAIと一緒に一篇の記事へ。",
    tags: ["温泉", "海辺", "ひとり旅"]
  },
  {
    title: "古い街並みで見つけた、静かな朝の輪郭",
    href: "/stories",
    image: photos.street,
    area: "長野・小諸",
    date: "日帰り",
    excerpt: "歩いた順番をたどりながら、写真と言葉の余白を整えた旅の記録。",
    tags: ["街歩き", "写真", "喫茶"]
  },
  {
    title: "美術館帰りのカフェで、旅の続きを書く",
    href: "/stories",
    image: photos.cafe,
    area: "香川・高松",
    date: "1泊2日",
    excerpt: "メモの断片から、その日だけの空気をすくい上げる編集体験。",
    tags: ["アート", "島旅", "カフェ"]
  }
];

export const features = [
  {
    icon: "spark",
    title: "旅の断片を、自然な文章へ",
    body: "写真、メモ、訪問先をもとに、AIがあなたの声色に寄り添って下書きを整えます。"
  },
  {
    icon: "map",
    title: "行程も気持ちも一緒に整理",
    body: "時間軸、場所、印象を分けて扱えるので、記録が散らかったままでも始められます。"
  },
  {
    icon: "book",
    title: "公開も保存も、自分の温度で",
    body: "公開記事、非公開の日記、次の旅の参考メモまで、旅後の余韻を長く残せます。"
  }
];

export const steps = [
  {
    number: "01",
    title: "写真とメモを入れる",
    body: "旅先で残した素材を、そのまま集めます。"
  },
  {
    number: "02",
    title: "AIと構成を整える",
    body: "見出し、順番、語り口を会話しながら調整します。"
  },
  {
    number: "03",
    title: "記事として残す",
    body: "読み返したくなる旅の記憶として保存・公開できます。"
  }
];

export const themeChips = [
  "温泉",
  "海辺",
  "器と民藝",
  "喫茶店",
  "美術館",
  "朝ごはん",
  "ローカル線",
  "小さな宿"
];

export const themes = themeChips;
