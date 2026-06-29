import { ArticleCard, Button, Chip, SectionTitle } from "../components";
import { storyCards, themes } from "../data.js";

export default function Saved() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_340px] md:items-end">
          <SectionTitle eyebrow="SAVED" title="保存した旅" body="次のひとり旅のヒントを、静かに集めておけます。気になる記録をテーマ別に整理しましょう。" />
          <Button href="/themes" variant="secondary">旅程をつくる</Button>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["春の温泉旅", "海辺で過ごす週末", "朝ごはんがおいしい宿"].map((name) => (
            <div key={name} className="rounded-card border border-line bg-paper p-5 shadow-soft">
              <p className="font-serif text-xl">{name}</p>
              <p className="mt-2 text-sm text-ink">保存した旅 4件</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">{["すべて", ...themes.slice(0, 5)].map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
        <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">{storyCards.map((story) => <ArticleCard key={story.title} story={story} compact />)}</div>
      </section>
    </main>
  );
}
