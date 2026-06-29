import { Button, Chip } from "../components";
import { photos } from "../data.js";

const outline = ["旅のはじまり", "海辺と湯けむり", "宿の朝ごはん", "また訪れたい理由"];

export default function Editor() {
  return (
    <main className="min-h-screen bg-ivory text-espresso">
      <section className="container-page py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-sm tracking-[0.18em] text-rose">AI EDITOR</p><h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">AI下書きを整える</h1></div>
          <div className="flex gap-3"><Button href="/stories/atami" variant="secondary">プレビュー</Button><Button href="/mypage">公開へ進む</Button></div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)_320px]">
          <aside className="rounded-card border border-line bg-paper p-5 shadow-soft">
            <h2 className="font-serif text-xl">編集メニュー</h2>
            <div className="mt-5 space-y-2">{["トーン", "長さ", "見出し", "写真の並び", "公開設定"].map((item, index) => <button key={item} className={`w-full rounded-xl px-4 py-3 text-left text-sm ${index === 0 ? "bg-sky text-teal" : "hover:bg-ivory"}`} type="button">{item}</button>)}</div>
          </aside>
          <article className="rounded-card border border-line bg-paper p-6 shadow-soft">
            <input className="w-full border-b border-line bg-transparent pb-4 font-serif text-3xl outline-none" defaultValue="熱海の湯けむりと、ひとりの朝ごはん" />
            <img className="mt-6 aspect-[16/8] w-full rounded-card object-cover" src={photos.onsen} alt="" />
            <div className="mt-8 space-y-8">{outline.slice(0, 3).map((title) => <section key={title}><h2 className="font-serif text-2xl">{title}</h2><p className="mt-4 leading-9 text-ink">雨上がりの熱海は、いつもより少し静かに見えました。海へ向かう坂道をひとりで歩きながら、誰にも急かされない旅の心地よさを思い出していました。</p></section>)}</div>
          </article>
          <aside className="space-y-5">
            <div className="rounded-card border border-line bg-paper p-5 shadow-soft">
              <h2 className="font-serif text-xl">AIにお願いする</h2>
              <textarea className="mt-4 min-h-28 w-full resize-none rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-teal" placeholder="例：もう少し余韻のある表現にして" />
              <div className="mt-4 flex flex-wrap gap-2">{["やわらかく", "短くする", "見出しを提案", "SNS用に要約"].map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
