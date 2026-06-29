import { navItems } from "../data.js";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-serif text-3xl text-espresso">Aitabi</p>
          <p className="mt-3 max-w-xl leading-7 text-ink">
            ひとり旅の余韻を、AIと一緒に読み返したくなる記録へ。
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink" aria-label="フッターナビゲーション">
          {navItems.map((item) => (
            <a key={item.href} className="focus-ring rounded-sm hover:text-teal" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
