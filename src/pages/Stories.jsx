import { ArticleCard, Chip, Icon, SectionTitle } from "../components";
import { storyCards, themes } from "../data.js";

export default function Stories() {
  return (
    <main className="bg-ivory text-espresso">
      <section className="container-page py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_360px] md:items-end">
          <SectionTitle
            eyebrow="STORIES"
            title="ひとり旅の記録を読む"
            body="温泉、街歩き、朝ごはん。大人の女性が自分のペースで残した旅の物語を集めました。"
          />
          <label className="relative block">
            <Icon name="search" className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sage" />
            <input className="w-full rounded-full border border-line bg-paper py-4 pl-12 pr-5 outline-none focus:border-teal" placeholder="行き先・テーマで探す" />
          </label>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {themes.concat(["1泊2日", "日帰り"]).map((theme) => <Chip key={theme}>{theme}</Chip>)}
        </div>
        <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {[...storyCards, ...storyCards].map((story, index) => <ArticleCard key={`${story.title}-${index}`} story={story} compact />)}
        </div>
      </section>
    </main>
  );
}
