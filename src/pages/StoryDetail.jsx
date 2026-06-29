import { ArticleCard, Button, Chip } from "../components";
import { photos, storyCards } from "../data.js";

const itinerary = ["熱海駅に到着", "海辺の宿でひと休み", "来宮神社へ散歩", "朝の喫茶店で朝ごはん"];

export default function StoryDetail() {
  const story = storyCards[0];
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page grid gap-10 py-12 md:grid-cols-[1fr_360px]">
        <div>
          <img className="aspect-[16/9] w-full rounded-card object-cover shadow-lift" src={photos.onsen} alt="" />
          <div className="mt-8 flex flex-wrap gap-2">{story.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">{story.title}</h1>
          <p className="mt-4 text-ink">静岡県・熱海市 / 2026.04.18 / mika</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/saved" icon="heart">保存する</Button>
            <Button href="/stories" variant="secondary" icon="arrow">一覧へ戻る</Button>
          </div>
        </div>
        <aside className="h-fit rounded-card border border-line bg-paper p-6 shadow-soft">
          <h2 className="font-serif text-2xl">旅程</h2>
          <ol className="mt-5 space-y-4">
            {itinerary.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage/30 text-sm text-teal">{index + 1}</span>
                <span className="leading-7 text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </aside>
      </section>
      <section className="container-page max-w-3xl pb-16">
        {["旅のはじまり", "海を見ながら、何もしない時間", "朝ごはんの記憶"].map((title) => (
          <div key={title} className="border-t border-line py-10">
            <h2 className="font-serif text-3xl">{title}</h2>
            <p className="mt-5 text-lg leading-10 text-ink">駅を出た瞬間、雨上がりの空気に少しだけ肩の力が抜けました。誰かに合わせる予定はなく、今日は自分の歩幅で進めばいい。そんな気持ちを、あとから読み返せるように残しました。</p>
          </div>
        ))}
      </section>
      <section className="container-page pb-20">
        <h2 className="font-serif text-3xl">似た旅の記録</h2>
        <div className="mt-8 grid gap-7 md:grid-cols-3">
          {storyCards.slice(1).map((item) => <ArticleCard key={item.title} story={item} compact />)}
        </div>
      </section>
    </main>
  );
}
