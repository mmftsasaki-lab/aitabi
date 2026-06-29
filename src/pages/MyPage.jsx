import { ArticleCard, Button, Chip } from "../components";
import { storyCards } from "../data.js";

export default function MyPage() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page grid gap-7 py-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-card border border-line bg-paper p-5 shadow-soft">
          <p className="font-serif text-2xl">さくら</p>
          <p className="mt-2 text-sm leading-7 text-ink">40代・東京 / 温泉と街歩きが好き</p>
          <nav className="mt-6 space-y-2">
            {["マイページ", "下書き", "公開済み", "お気に入り", "プロフィール", "設定"].map((item, index) => (
              <a key={item} className={`block rounded-xl px-4 py-3 text-sm ${index === 0 ? "bg-sky text-teal" : "hover:bg-ivory"}`} href={index === 3 ? "/saved" : "/mypage"}>{item}</a>
            ))}
          </nav>
        </aside>
        <div>
          <div className="rounded-card border border-line bg-paper p-6 shadow-soft md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm tracking-[0.18em] text-rose">MY PAGE</p>
                <h1 className="mt-3 font-serif text-4xl">旅の記録</h1>
              </div>
              <Button href="/create">新しい旅を記録する</Button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[["公開した旅", "12"], ["下書き", "3"], ["保存した旅", "28"]].map(([label, value]) => (
                <div key={label} className="rounded-card bg-ivory p-5">
                  <p className="text-sm text-ink">{label}</p>
                  <p className="mt-2 font-serif text-4xl text-teal">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{["すべて", "下書き", "公開済み"].map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
          <div className="mt-6 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {storyCards.map((story) => <ArticleCard key={story.title} story={story} compact />)}
          </div>
          <div className="mt-8 rounded-card border border-line bg-sky p-6">
            <h2 className="font-serif text-2xl">今月の旅の記録</h2>
            <p className="mt-3 leading-7 text-ink">春の旅をまとめてみませんか。写真が増えたタイミングで、AIが下書きを提案できます。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
