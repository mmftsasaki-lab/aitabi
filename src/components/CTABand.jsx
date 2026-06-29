import { Button } from "./Button.jsx";

export function CTABand({
  title = "旅の記憶を、今日のうちに少しだけ整える。",
  body = "写真と短いメモから、Aitabiがあなたらしい旅の記事づくりを手伝います。",
  image = "/assets/photos/travel-05.jpg",
  buttonLabel = "記録をつくる",
  href = "/create"
}) {
  return (
    <section className="container-page py-16">
      <div className="grid overflow-hidden rounded-card border border-line bg-teal text-white shadow-lift md:grid-cols-[1.1fr_0.9fr]">
        <div className="p-8 md:p-12">
          <p className="text-sm tracking-[0.22em] text-sky">AITABI</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">{title}</h2>
          <p className="mt-5 max-w-2xl leading-8 text-white/85">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={href} variant="secondary" icon="edit">{buttonLabel}</Button>
            <Button href="/stories" variant="ghost" className="text-white hover:bg-white/10" icon="arrow">
              旅の記録を見る
            </Button>
          </div>
        </div>
        <img className="h-full min-h-72 w-full object-cover" src={image} alt="" />
      </div>
    </section>
  );
}
