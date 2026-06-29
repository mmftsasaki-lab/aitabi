import { ArticleCard, Button, Chip, CTABand, Icon, SectionTitle, StepCard } from "../components";
import { photos, steps, storyCards, themes } from "../data.js";

const values = [
  { icon: "camera", title: "写真とメモだけ", body: "特別な準備は不要。旅先の気持ちをそのまま残せます。" },
  { icon: "heart", title: "文章が苦手でも安心", body: "AIがあなたの言葉をやさしく整えます。" },
  { icon: "map", title: "次の旅のヒントに", body: "みんなの体験が、あなたの旅を広げます。" }
];

export default function Home() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="relative overflow-hidden bg-paper">
        <img className="absolute inset-0 h-full w-full object-cover" src={photos.hero} alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/90 to-paper/20" />
        <div className="container-page relative grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="animate-fade-up">
            <h1 className="font-serif text-[42px] leading-[1.45] md:text-[62px]">
              ひとり旅の余韻を<br />AIとやさしく残す。
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-ink">
              写真とメモを渡すだけで、あなたの旅が読みたくなる物語に。
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/create" size="lg">旅の記録をはじめる</Button>
              <Button href="/stories" size="lg" variant="secondary">みんなの旅を読む</Button>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>
      <section className="container-page -mt-16 relative z-10 grid overflow-hidden rounded-card border border-line bg-paper shadow-soft md:grid-cols-3">
        {values.map((value) => (
          <div key={value.title} className="flex gap-5 border-line p-8 md:border-r last:md:border-r-0">
            <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-rose/25 text-rose">
              <Icon name={value.icon} />
            </span>
            <div>
              <h2 className="font-serif text-xl">{value.title}</h2>
              <p className="mt-3 text-sm leading-7 text-ink">{value.body}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="container-page py-20">
        <SectionTitle title="今読みたいひとり旅" align="center" />
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {storyCards.map((story) => <ArticleCard key={story.title} story={story} />)}
        </div>
      </section>
      <section className="bg-paper py-20">
        <div className="container-page">
          <SectionTitle title="旅から帰ったら、まず3つだけ" align="center" />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step) => <StepCard key={step.title} {...step} />)}
          </div>
        </div>
      </section>
      <section className="container-page py-16 text-center">
        <SectionTitle title="今の気分から探す" align="center" />
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {themes.map((theme) => <Chip key={theme}>{theme}</Chip>)}
        </div>
      </section>
      <CTABand title="あの感動を、ちゃんと残すための場所。" image={photos.notebook} buttonLabel="無料で旅を残す" />
    </main>
  );
}
