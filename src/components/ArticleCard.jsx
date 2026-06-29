import { Chip } from "./Chip.jsx";
import { Icon } from "./Icon.jsx";

export function ArticleCard({ story, compact = false }) {
  return (
    <article className="group overflow-hidden rounded-card border border-line bg-paper shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <a href={story.href} className="block focus-ring">
        <div className={compact ? "aspect-[4/3]" : "aspect-[5/4]"}>
          <img className="h-full w-full object-cover" src={story.image} alt="" />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-rose">
            <span>{story.area}</span>
            <span aria-hidden="true">/</span>
            <span>{story.date}</span>
          </div>
          <h3 className="mt-3 font-serif text-xl leading-snug text-espresso md:text-2xl">
            {story.title}
          </h3>
          <p className="mt-3 line-clamp-3 leading-7 text-ink">{story.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {story.tags?.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-teal">
            読む
            <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </span>
        </div>
      </a>
    </article>
  );
}
