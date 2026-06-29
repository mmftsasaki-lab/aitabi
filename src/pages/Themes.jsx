import { ArticleCard, Chip, SectionTitle } from "../components";
import { photos, storyCards, themes } from "../data.js";

const tiles = [
  ["温泉でほどける", photos.onsen],
  ["週末に整える", photos.notebook],
  ["海辺で深呼吸", photos.hero],
  ["美術館をめぐる", photos.cafe],
  ["朝ごはんを楽しむ", photos.breakfast],
  ["ローカル線に乗る", photos.street]
];

export default function Themes() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page py-16">
        <SectionTitle eyebrow="THEMES" title="今の気分から、ひとり旅を探す" body="行き先が決まっていなくても大丈夫。心が向くテーマから旅を見つけられます。" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {tiles.map(([label, image]) => (
            <a key={label} href="/stories" className="group relative min-h-56 overflow-hidden rounded-card shadow-soft">
              <img className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" src={image} alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
              <span className="absolute bottom-5 left-5 font-serif text-2xl text-white">{label}</span>
            </a>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">{themes.map((item) => <Chip key={item}>{item}</Chip>)}</div>
        <div className="mt-14 grid gap-7 md:grid-cols-3">{storyCards.map((story) => <ArticleCard key={story.title} story={story} compact />)}</div>
      </section>
    </main>
  );
}
