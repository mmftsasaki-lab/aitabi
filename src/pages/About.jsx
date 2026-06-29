import { Button, CTABand, Icon, SectionTitle } from "../components";
import { photos, steps } from "../data.js";

export default function About() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page grid gap-10 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <p className="text-sm tracking-[0.18em] text-rose">ABOUT</p>
          <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">旅の余韻を、<br />あなたらしい言葉で残す場所。</h1>
          <p className="mt-6 max-w-xl text-lg leading-9 text-ink">Aitabiは、写真と短いメモから旅の流れや気持ちを整理し、読み返したくなる記事へ整えるAI旅記録サービスです。</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button href="/create">最初の旅を残してみる</Button><Button href="/stories" variant="secondary">旅の記録を見る</Button></div>
        </div>
        <div className="relative min-h-[480px]">
          <img className="absolute right-0 top-0 h-[74%] w-[78%] rounded-card object-cover shadow-lift" src={photos.notebook} alt="" />
          <img className="absolute bottom-0 left-0 h-[48%] w-[58%] rounded-card border-8 border-ivory object-cover shadow-soft" src={photos.street} alt="" />
        </div>
      </section>
      <section className="border-y border-line bg-paper py-14">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {["文章にするのが苦手", "旅の記憶を忘れたくない", "次の旅のヒントを見つけたい"].map((value) => (
            <article key={value} className="rounded-card border border-line bg-ivory p-6">
              <Icon name="spark" className="h-6 w-6 text-gold" />
              <h2 className="mt-5 font-serif text-2xl">{value}</h2>
              <p className="mt-3 leading-7 text-ink">無理に整えようとしなくても、AIが自然な流れを提案します。</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container-page py-16">
        <SectionTitle eyebrow="FLOW" title="使い方はかんたん" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.title} className="rounded-card border border-line bg-paper p-6 shadow-soft">
              <p className="font-serif text-4xl text-rose">{step.number}</p>
              <h2 className="mt-5 font-serif text-2xl">{step.title}</h2>
              <p className="mt-3 leading-7 text-ink">{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CTABand title="AIは、あなたの旅を奪わない。" body="主役はいつも、旅をしたあなた自身。AIは言葉を整えるためにそっと寄り添います。" image={photos.hero} />
    </main>
  );
}
