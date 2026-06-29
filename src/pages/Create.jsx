import { Button, Chip } from "../components";
import { photos, themes } from "../data.js";

export default function Create() {
  return (
    <main className="min-h-screen bg-ivory text-espresso">
      <section className="container-page grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-7">
          <p className="text-sm font-medium tracking-[0.18em] text-rose">CREATE</p>
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">写真とメモから、<br />旅の物語をつくる。</h1>
          <p className="max-w-xl text-lg leading-9 text-ink">旅先で残した写真、短いメモ、行き先を入れるだけ。AIが読みやすい下書きに整えます。</p>
          <div className="grid grid-cols-2 gap-3">
            {[photos.hero, photos.onsen, photos.street, photos.breakfast].map((src, index) => (
              <button key={src} type="button" className={`group relative aspect-[4/3] overflow-hidden rounded-card border bg-paper shadow-soft ${index === 0 ? "border-rose" : "border-line"}`}>
                <img className="h-full w-full object-cover transition duration-700 group-hover:scale-105" src={src} alt="" />
                <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-xs">写真 {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
        <form className="rounded-card border border-line bg-paper p-6 shadow-lift md:p-8">
          <div className="flex items-center justify-between border-b border-line pb-5">
            <div>
              <p className="text-sm text-ink">新しい投稿</p>
              <h2 className="font-serif text-3xl">下書きをつくる</h2>
            </div>
            <span className="rounded-full bg-sky px-4 py-2 text-sm text-teal">AI補助あり</span>
          </div>
          <div className="mt-6 grid gap-5">
            <label><span className="mb-2 block text-sm text-ink">旅のタイトル</span><input className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" defaultValue="熱海、雨上がりの朝に" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label><span className="mb-2 block text-sm text-ink">行き先</span><input className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" defaultValue="静岡県・熱海" /></label>
              <label><span className="mb-2 block text-sm text-ink">日程</span><input className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal" defaultValue="2026年4月" /></label>
            </div>
            <label><span className="mb-2 block text-sm text-ink">心に残ったこと</span><textarea className="min-h-40 w-full resize-none rounded-xl border border-line bg-white px-4 py-3 leading-7 outline-none focus:border-teal" defaultValue="駅を出たら雨が止んで、坂道の向こうに海が見えた。宿の朝食で出た干物がおいしくて、湯気まで覚えている。" /></label>
            <div><span className="mb-3 block text-sm text-ink">気分タグ</span><div className="flex flex-wrap gap-2">{themes.slice(0, 6).map((tag) => <Chip key={tag}>{tag}</Chip>)}</div></div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button as="button" type="button" icon="spark">AIで下書きを作成</Button>
              <Button as="button" type="button" variant="secondary" icon="book">下書き保存</Button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
